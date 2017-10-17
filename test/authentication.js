const Authentication = artifacts.require('./Authentication.sol');

contract('Messaging - basic', function(accounts) {
  let authenticationInstance;
  it('...should sign up and log in a user.', function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;

      return authenticationInstance.signup('testuser', {from: accounts[0]});
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function(userName) {
      assert.equal(web3.toUtf8(userName), 'testuser', 'The user was not signed up.');
    });
  });

  it('has Id works', function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;

      return authenticationInstance.signup('testuser', {from: accounts[0]});
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function() {
      const id = '1'.repeat(32);
      return authenticationInstance.hasMessageId(
        id,
        {from: accounts[0]}
      );
    }).then(function(hasId) {
      assert.ok(hasId.tx);
    });
  });

  it('By default getContactsLength returns 0', function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;

      return authenticationInstance.signup('testuser', {from: accounts[0]});
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function() {
      return authenticationInstance.getContactsLength();
    }).then(function(number) {
      assert.equal(web3.toDecimal(number), 0);
    });
  });

  it('sendMessage able to send message', function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;
      const user1 = authenticationInstance.signup('testuser', {from: accounts[1]});
      const user2 = authenticationInstance.signup('testuser2', {from: accounts[0]});
      return Promise.all([user1, user2]);
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function() {
      const id = '1'.repeat(32);
      const textMessage = 'Hello world';
      return authenticationInstance.sendMessage(
        id,
        accounts[1],
        [textMessage],
        {from: accounts[0]}
      );
    }).then(function(sent) {
      assert.ok(sent.tx);
    });
  });

  it('After message is sent we have one contact', function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;
      const user1 = authenticationInstance.signup('testuser', {from: accounts[1]});
      const user2 = authenticationInstance.signup('testuser2', {from: accounts[0]});
      return Promise.all([user1, user2]);
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function() {
      const id = '2'.repeat(32);
      const textMessage = 'Hello world';
      return authenticationInstance.sendMessage(
        id,
        accounts[1],
        [textMessage],
        {from: accounts[0]}
      );
    }).then(function() {
      return authenticationInstance.getContactsLength();
    }).then(function(len) {
      assert.equal(web3.toDecimal(len), 1);
    });
  });
});

contract('Messaging - account gets added', function(accounts) {
  let authenticationInstance;
  it('After message is sent we are able to retrieve a first addr that is added to the list of contacts', function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;
      const user1 = authenticationInstance.signup('testuser', {from: accounts[1]});
      const user2 = authenticationInstance.signup('testuser2', {from: accounts[0]});
      return Promise.all([user1, user2]);
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function() {
      const id = '2'.repeat(32);
      const textMessage = 'Hello world';
      return authenticationInstance.sendMessage(
        id,
        accounts[1],
        [textMessage],
        {from: accounts[0]}
      );
    }).then(function() {
      return authenticationInstance.getContactsLength();
    }).then(function(len) {
      return authenticationInstance.getContactByIdx(web3.toDecimal(len) - 1);
    }).then(function(addr) {
      assert.equal(addr, accounts[1]);
    });
  });
});

contract('Messaging - able to retrive own message list', function(accounts) {
  let authenticationInstance;
  it('Able to retrieve message list', function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;
      const user1 = authenticationInstance.signup('testuser', {from: accounts[1]});
      const user2 = authenticationInstance.signup('testuser2', {from: accounts[0]});
      return Promise.all([user1, user2]);
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function() {
      const id = '2'.repeat(32);
      const textMessage = 'Hello world';
      return authenticationInstance.sendMessage(
        id,
        accounts[1],
        [textMessage],
        {from: accounts[0]}
      );
    }).then(function() {
      return authenticationInstance.getContactsLength();
    }).then(function(len) {
      return authenticationInstance.getContactByIdx(web3.toDecimal(len) - 1);
    }).then(function(addr) {
      return authenticationInstance.getMessageIdsForAddress(addr);
    }).then(function(messageIds) {
      assert.ok(messageIds.length);
    });
  });
});

contract('Messaging - able to retrive own message', function(accounts) {
  let authenticationInstance;
  const textMessage = 'Hello world';
  const id = 'dummy-id';
  it('Able to retrieve message', function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;
      const user1 = authenticationInstance.signup('testuser', {from: accounts[1]});
      const user2 = authenticationInstance.signup('testuser2', {from: accounts[0]});
      return Promise.all([user1, user2]);
    }).then(function(tr) {
      return authenticationInstance.login.call();
    }).then(function() {
      return authenticationInstance.sendMessage(
        id,
        accounts[1],
        [textMessage],
        {from: accounts[0]}
      );
    }).then(function(rct) {
      return authenticationInstance.getContactsLength();
    }).then(function(len) {
      return authenticationInstance.getContactByIdx(web3.toDecimal(len) - 1);
    }).then(function(addr) {
      return authenticationInstance.getMessageIdsForAddress(addr);
    }).then(function(messageIds) {
      return authenticationInstance.getMessage(messageIds[0]);
    }).then(function(resp) {
      const messageId = resp[0];
      const data = resp[2];
      const sender = resp[3];
      const receiver = resp[4];
      assert.equal(sender, accounts[0]);
      assert.equal(receiver, accounts[1]);
      assert.equal(web3.toUtf8(data[0]), textMessage);
      assert.equal(web3.toUtf8(messageId), id);
    });
  });
});
