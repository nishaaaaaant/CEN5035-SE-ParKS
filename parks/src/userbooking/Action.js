import * as types from "./ActionTypes";

/**
 * @description Request action for registering new address
 */
export const requestUserBooking = () => ({
  type: types.REQUEST_USER_BOOKING,
});

/**
 * @description Receive action for adding the new address
 */
export const receiveUserBooking = (payload) => ({
  type: types.RECEIVE_USER_BOOKING,
  payload,
});

/**
 * @description Failure action for registering new address
 */
export const failureUserBooking = (payload) => ({
  type: types.FAILURE_USER_BOOKING,
  payload,
});
