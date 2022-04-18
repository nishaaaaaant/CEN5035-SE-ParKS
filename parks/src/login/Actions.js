import * as types from "./ActionTypes";

/**
 * @description Request action for logging a user
 */
export const requestUserLogin = () => ({
  type: types.REQUEST_USER_LOGIN,
});

/**
 * @description Receive action for logging a user
 */
export const receiveUserLogin = (payload) => ({
  type: types.RECEIVE_USER_LOGIN,
  payload,
});

/**
 * @description Failure action for logging a user
 */
export const failureUserLogin = () => ({
  type: types.FAILURE_USER_LOGIN,
});

/**
 * @description Request action for logout
 */
export const requestUserLogout = () => ({
  type: types.REQUEST_USER_LOGOUT,
});
