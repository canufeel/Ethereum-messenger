import { call } from 'redux-saga/effects';
import { getAuthenticationCoinBase } from '../api/coinbase';
import { loginUser } from './login';

export function* signUp({
  payload: {
    web3,
    name
  }
}) {
  if (typeof web3 !== 'undefined') {
    const {
      coinbase,
      authentication
    } = yield call(getAuthenticationCoinBase, web3);
    const authenticationInstance = yield call(authentication.deployed);
    yield call(authenticationInstance.signup, name, {from: coinbase});
    yield call(loginUser, {
      payload: {
        web3
      }
    });
  } else {
    console.error('Web3 is not initialized.');
  }
}
