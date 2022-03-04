import * as actionTypes from "./ActionTypes";

const defaultState = {
  userData: [],
  isLoggedIn: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
};

const LoginReducer = function (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_USER_LOGIN:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case actionTypes.RECEIVE_USER_LOGIN:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        isLoggedIn: true,
        userData: action.payload,
      };
    case actionTypes.FAILURE_USER_LOGIN:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isLoggedIn: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default LoginReducer;