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
