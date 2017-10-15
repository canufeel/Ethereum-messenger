import { call, put } from 'redux-saga/effects';
import { getAuthenticationCoinBase } from '../api/coinbase';
import { profile as profileActions } from '../actions';

export function* updateUser({
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
    try {
      const authenticationInstance = yield call(authentication.deployed);
      yield call(authenticationInstance.update, name, {from: coinbase});
      yield put(
        profileActions.userUpdated({
          name
        })
      );
    } catch (e) {
      console.error('Wallet ' + coinbase + ' does not have an account!');
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
