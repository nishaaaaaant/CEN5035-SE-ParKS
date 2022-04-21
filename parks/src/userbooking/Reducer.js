import * as actionTypes from "./ActionTypes";

const defaultState = {
  userBookings: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
};

const UserBookingsReducer = function (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_USER_BOOKING:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        isError: false,
      };
    case actionTypes.RECEIVE_USER_BOOKING:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
        userBookings: action.payload,
      };
    case actionTypes.FAILURE_USER_BOOKING:
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

export default UserBookingsReducer;
