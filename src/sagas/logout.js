import { put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { INDEX_PATH } from '../routes';
import { logout as logoutActions } from '../actions';

export function* logoutUser() {
  yield put(logoutActions.userLoggedOut());
  yield put(
    push(
      INDEX_PATH
    )
  );
}
