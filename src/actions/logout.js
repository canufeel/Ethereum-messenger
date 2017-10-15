
import * as types from './types';

export const logoutUser = () => ({
  type: types.LOGOUT_USER
});

export const userLoggedOut = user => ({
  type: types.USER_LOGGED_OUT,
  payload: user
});
