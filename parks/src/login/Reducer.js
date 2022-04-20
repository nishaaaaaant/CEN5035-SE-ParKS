import * as actionTypes from "./ActionTypes";
import {
  REQUEST_USER_UPDATE,
  RECEIVE_USER_UPDATE,
  FAILURE_USER_UPDATE,
} from "../user/ActionTypes";

const initStatus = localStorage.getItem("isLoggedIn") === "true" ? true : false;

const defaultState = {
  userData: [],
  loggedIn: initStatus,
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
        loggedIn: true,
        userData: action.payload,
      };
    case actionTypes.FAILURE_USER_LOGIN:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        loggedIn: false,
        isError: true,
      };
    case REQUEST_USER_UPDATE:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case RECEIVE_USER_UPDATE:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        userData: action.payload,
      };
    case FAILURE_USER_UPDATE:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
    case actionTypes.REQUEST_USER_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default LoginReducer;
