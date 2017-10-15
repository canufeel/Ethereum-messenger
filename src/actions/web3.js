import * as types from './types';

export const initializeWeb3 = () => ({
  type: types.INITIALIZE_WEB3
});

export const web3Initialized = (results) => ({
  type: types.WEB3_INITIALIZED,
  payload: results
});
