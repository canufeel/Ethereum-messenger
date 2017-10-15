import * as types from './types';

export const userUpdated = (user) => ({
  type: types.USER_UPDATED,
  payload: user
});

export const updateUser = payload => ({
  type: types.UPDATE_USER,
  payload
});
