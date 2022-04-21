import * as actionTypes from "./ActionTypes";

const defaultState = {
  userData: [],
  isLoggedIn: false,
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
        isLoggedIn: true,
        userData: action.payload,
      };
    case actionTypes.FAILURE_USER_BOOK_NOW:
      return {
        ...state,
        isFetching: false,
        isSuccess: false,
        isLoggedIn: false,
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
