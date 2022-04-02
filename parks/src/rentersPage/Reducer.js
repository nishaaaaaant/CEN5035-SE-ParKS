import * as actionTypes from "./ActionTypes";

const defaultState = {
  addressData: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
};

const RenterPageReducer = function (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_ADD_NEW_ADDRESS:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case actionTypes.RECEIVE_ADD_NEW_ADDRESS:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        addressData: action.payload,
      };
    case actionTypes.FAILURE_ADD_NEW_ADDRESS:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isError: true,
        // isUserRegistered: action.payload,
      };
    default:
      return state;
  }
};

export default RenterPageReducer;