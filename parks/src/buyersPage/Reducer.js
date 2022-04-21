import * as actionTypes from "./ActionTypes";

const defaultState = {
  userData: [],
  clientSecretKey: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
};

const BookNowReducer = function (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_USER_BOOK_NOW:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case actionTypes.RECEIVE_USER_BOOK_NOW:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        userData: action.payload,
      };
    case actionTypes.FAILURE_USER_BOOK_NOW:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
    case actionTypes.REQUEST_CLIENT_SECRET:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case actionTypes.RECEIVE_CLIENT_SECRET:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        clientSecretKey: action.payload,
      };
    case actionTypes.FAILURE_CLIENT_SECRET:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
    case actionTypes.REQUEST_BOOKED_SLOTS:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case actionTypes.RECEIVE_BOOKED_SLOTS:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        rentedAddressData: action.payload,
      };
    case actionTypes.FAILURE_BOOKED_SLOTS:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default BookNowReducer;
