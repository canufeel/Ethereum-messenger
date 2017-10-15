import * as types from '../actions/types';
const initialState = {
  data: null
};

const userReducer = (state = initialState, action) => {
  if (action.type === types.USER_LOGGED_IN || action.type === types.USER_UPDATED)  {
    return {
      ...state,
      data: action.payload
    };
  }

  if (action.type === types.USER_LOGGED_OUT)  {
    return {
      ...state,
      data: null
    };
  }

  return state;
};

export default userReducer;
