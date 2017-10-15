import { call, put } from 'redux-saga/effects';
import { userLoggedIn } from '../actions/login';
import { push } from 'react-router-redux';
import { getAuthenticationCoinBase } from '../api/coinbase';
import {
  DASHBOARD_FULL_PATH,
  SIGNUP_FULL_PATH
} from '../routes';

export function* loginUser({
  payload: {
    web3
  }
}) {
  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    const {
      coinbase,
      authentication
    } = yield call(getAuthenticationCoinBase, web3);
    try {
      const authenticationInstance = yield call(authentication.deployed);
      const result = yield call(authenticationInstance.login, { from: coinbase });
      const userName = web3.toUtf8(result);
      yield put(
        userLoggedIn(
          { name: userName }
        )
      );
      yield put(push(DASHBOARD_FULL_PATH));
    } catch (e) {
      // If error, go to signup page.
      console.error('Wallet ' + coinbase + ' does not have an account!');
      yield put(push(SIGNUP_FULL_PATH));
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
