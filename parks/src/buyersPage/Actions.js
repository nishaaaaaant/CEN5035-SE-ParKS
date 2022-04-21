import * as types from "./ActionTypes";

/**
 * @description Request action for logging a user
 */
export const requestUserBookNow = () => ({
  type: types.REQUEST_USER_BOOK_NOW,
});

/**
 * @description Receive action for logging a user
 */
export const receiveUserBookNow = (payload) => ({
  type: types.RECEIVE_USER_BOOK_NOW,
  payload,
});

/**
 * @description Failure action for logging a user
 */
export const failureUserBookNow = () => ({
  type: types.FAILURE_USER_BOOK_NOW,
});

/**
 * @description Request action for fetching client secret key
 */
export const requestClientSecret = () => ({
  type: types.REQUEST_CLIENT_SECRET,
});

/**
 * @description Receive action for fetching client secret key
 */
export const receiveClientSecret = (payload) => ({
  type: types.RECEIVE_CLIENT_SECRET,
  payload: payload,
});

export const requestBookedSlots = () => ({
  type: types.REQUEST_BOOKED_SLOTS,
});

/**
 * @description Receive action for adding the new address
 */
export const recieveBookedSlots = (payload) => ({
  type: types.RECEIVE_BOOKED_SLOTS,
  payload,
});

/**
 * @description Failure action for fetching client secret key
 */
export const failureClientSecret = () => ({
  type: types.FAILURE_CLIENT_SECRET,
});

/**
 * @description Failure action for registering new address
 */
export const failureBookedSlots = (payload) => ({
  type: types.FAILURE_BOOKED_SLOTS,
  payload,
});
