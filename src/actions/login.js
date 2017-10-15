import * as types from './types';

export const userLoggedIn = user => ({
  type: types.USER_LOGGED_IN,
  payload: user
});

export const loginUser = web3 => ({
  type: types.LOGIN_USER,
  payload: web3
});
