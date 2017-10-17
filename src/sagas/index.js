import * as types from '../actions/types';
import { takeEvery } from 'redux-saga/effects';
import {
  loginUser
} from './login';
import {
  signUp
} from './signup';
import {
  updateUser
} from './profile';
import {
  initializeWeb3
} from './web3';
import {
  logoutUser
} from './logout';
import {
  sendMessage
} from './messages';

export default function* root() {
  yield takeEvery(types.LOGIN_USER, loginUser);
  yield takeEvery(types.LOGOUT_USER, logoutUser);
  yield takeEvery(types.SIGN_UP_USER, signUp);
  yield takeEvery(types.UPDATE_USER, updateUser);
  yield takeEvery(types.INITIALIZE_WEB3, initializeWeb3);
  yield takeEvery(types.SEND_MESSAGE, sendMessage);
}
