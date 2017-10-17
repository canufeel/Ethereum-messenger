import * as types from './types';

export const sendMessage = payload => ({
  type: types.SEND_MESSAGE,
  payload
});
