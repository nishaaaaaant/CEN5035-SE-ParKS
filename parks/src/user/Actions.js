import * as types from "./ActionTypes";

/**
 * @description Request action for logging a user
 */
export const requestUserUpdate = () => ({
  type: types.REQUEST_USER_UPDATE,
});

/**
 * @description Receive action for logging a user
 */
export const receiveUserUpdate = (payload) => ({
  type: types.RECEIVE_USER_UPDATE,
  payload,
});

/**
 * @description Failure action for logging a user
 */
export const failureUserUpdate = () => ({
  type: types.FAILURE_USER_UPDATE,
});
