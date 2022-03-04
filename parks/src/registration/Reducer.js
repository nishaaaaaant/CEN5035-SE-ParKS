import * as actionTypes from "./ActionTypes";

const defaultState = {
  homePageData: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  isUserRegistered: false
};

const HomePageReducer = function (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_USER_REGISTRAION:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case actionTypes.RECEIVE_USER_REGISTRAION:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        homePageData: action.payload,
      };
    case actionTypes.FAILURE_USER_REGISTRAION:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isError: true,
        isUserRegistered: action.payload
      };
    default:
      return state;
  }
};

export default HomePageReducer;