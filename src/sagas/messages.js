import { call, all, put } from 'redux-saga/effects';
import { getAuthenticationCoinBase } from '../api/coinbase';
import * as types from '../actions/types';

function randomString(length, chars) {
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function* generateCheckMessageId({
  authenticationInstance,
  coinbase
}) {
  let id = randomString(
    32,
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  );
  const valid = yield call(
    authenticationInstance.hasMessageId,
    id,
    { from: coinbase }
  );
  if (!valid) {
    id = yield call(generateCheckMessageId, {
      authenticationInstance,
      coinbase
    });
  }
  return id;
}

export function* sendMessage({
  payload: {
    web3,
    message,
    account,
  }
}) {
  if (message.length < 32 && web3.isAddress(account)) {
    const {
      coinbase,
      authentication
    } = yield call(getAuthenticationCoinBase, web3);
    try {
      const authenticationInstance = yield call(authentication.deployed);
      const id = yield call(generateCheckMessageId, {
        web3,
        authenticationInstance,
        coinbase
      });
      const gas = yield call(
        authenticationInstance.sendMessage.estimateGas,
        id,
        account,
        [message]
      );
      yield call(
        authenticationInstance.sendMessage,
        id,
        account,
        [message],
        {
          from: coinbase,
          gas
        }
      );
    } catch (e) {
      throw e;
    }
  }
}

export function* getContactsLength({
  authenticationInstance,
  coinbase,
  web3
}) {
  const contactsLengthResponse = yield call(authenticationInstance.getContactsLength, { from: coinbase });
  return web3.toDecimal(contactsLengthResponse);
}

export function* getContactForId({
  id,
  authenticationInstance,
  coinbase,
}) {
  return yield call(authenticationInstance.getContactByIdx, id, { from: coinbase });
}

export function* getMessageIdsForAddress({
  address,
  authenticationInstance,
  coinbase,
}) {
  return yield call(authenticationInstance.getMessageIdsForAddress, address, { from: coinbase });
}

export function* getMessageForId({
  id,
  authenticationInstance,
  coinbase,
}) {
  return yield call(
    authenticationInstance.getMessage,
    id,
    { from: coinbase }
  );
}

export function* getContacts({
  web3
}) {
  const {
    coinbase,
    authentication
  } = yield call(getAuthenticationCoinBase, web3);
  const authenticationInstance = yield call(authentication.deployed);
  const contactsLength = yield call(getContactsLength, {
    web3,
    authenticationInstance,
    coinbase
  });
  const idsArr = [];
  for (let i = 0; i < contactsLength; i++) {
    idsArr.push(i);
  }
  const contactAddresses = yield all(
    idsArr.map(id => call(getContactForId, {
      id,
      authenticationInstance,
      coinbase
    }))
  );
  const messageIdsForContacts = yield all(contactAddresses.map(address => call(getMessageIdsForAddress, address)));
  const contactMessagesHash = contactAddresses.map((contact, idx) => ({
    [contact]: messageIdsForContacts[idx]
  }));
  yield put({
    type: types.ADD_CONTACT_MESSAGE_REFS,
    payload: contactMessagesHash
  });
}
