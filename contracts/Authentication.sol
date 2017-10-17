pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {
  struct Message {
    uint time;
    bytes32[] data;
    address sender;
    address receiver;
  }

  struct User {
    bytes32 name;
    mapping (address => bytes32[]) chats;
    mapping (address => bool) contactsMap;
    address[] contacts;
  }

  event NewMessage(address sender, address receiver);

  mapping (bytes32 => Message) private messages;
  mapping (bytes32 => bool) private messageIds;
  mapping (address => User) private users;

  modifier onlyExistingUser {
    // Check if user exists or terminate

    require(!(users[msg.sender].name == 0x0));
    _;
  }

  modifier messageIdNotPresent(bytes32 id) {
    require(!(messageIds[id] == true));
    _;
  }

  modifier onlyAllowedMessage(bytes32 id) {
    require(messages[id].sender == msg.sender || messages[id].receiver == msg.sender);
    _;
  }

  modifier onlyExistingReceiver(address user) {
    require(!(users[user].name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 name) {
    // Only valid names allowed

    require(!(name == 0x0));
    _;
  }

  function login() constant
  onlyExistingUser
  returns (bytes32) {
    return (users[msg.sender].name);
  }

  function signup(bytes32 name)
  payable
  onlyValidName(name)
  returns (bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.

    if (users[msg.sender].name == 0x0)
    {
        users[msg.sender].name = name;

        return (users[msg.sender].name);
    }

    return (users[msg.sender].name);
  }

  function update(bytes32 name)
  payable
  onlyValidName(name)
  onlyExistingUser
  returns (bytes32) {
    // Update user name.

    if (users[msg.sender].name != 0x0)
    {
        users[msg.sender].name = name;

        return (users[msg.sender].name);
    }
  }

  function hasMessageId(bytes32 id)
  onlyExistingUser
  returns (bool) {
    return messageIds[id] == true;
  }

  function getContactsLength () constant
  onlyExistingUser
  returns (uint) {
    return users[msg.sender].contacts.length;
  }

  function getContactByIdx (uint i) constant
  onlyExistingUser
  returns (address) {
    return users[msg.sender].contacts[i];
  }

  function getMessage (bytes32 id) constant
  onlyExistingUser
  onlyAllowedMessage(id)
  returns (bytes32, uint, bytes32[], address, address) {
    Message memory message = messages[id];
    return (id, message.time, message.data, message.sender, message.receiver);
  }

  function getMessageIdsForAddress (address contact) constant
  onlyExistingUser
  returns (bytes32[]) {
    return users[msg.sender].chats[contact];
  }

  function sendMessage(bytes32 id, address receiver, bytes32[] text)
  payable
  onlyExistingUser
  onlyExistingReceiver(receiver)
  messageIdNotPresent(id)
  returns (bool) {
    messages[id] = Message(now, text, msg.sender, receiver);
    messageIds[id] = true;
    users[msg.sender].chats[receiver].push(id);
    users[receiver].chats[msg.sender].push(id);
    if (!(users[msg.sender].contactsMap[receiver])) {
      users[msg.sender].contactsMap[receiver] = true;
      users[msg.sender].contacts.push(receiver);
    }
    if (!(users[receiver].contactsMap[msg.sender])) {
      users[receiver].contactsMap[msg.sender] = true;
      users[receiver].contacts.push(msg.sender);
    }
    return true;
  }
}
