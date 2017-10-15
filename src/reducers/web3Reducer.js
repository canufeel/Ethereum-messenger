import * as types from '../actions/types';
const initialState = {
  web3Instance: null
};

const web3Reducer = (state = initialState, action) => {
  if (action.type === types.WEB3_INITIALIZED) {
    return {
      ...state,
      web3Instance: action.payload.web3Instance
    };
  }

  return state;
};

export default web3Reducer;
