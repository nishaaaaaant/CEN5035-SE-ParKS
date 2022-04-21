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
  payload,
});

/**
 * @description Failure action for fetching client secret key
 */
export const failureClientSecret = () => ({
  type: types.FAILURE_CLIENT_SECRET,
});
