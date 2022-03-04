import * as types from "./ActionTypes";

/**
 * @description Request action for registering new user
 */
export const requestUserRegistration = () => ({
  type: types.REQUEST_USER_REGISTRAION,
});

/**
 * @description Receive action for registering new user
 */
export const receiveUserRegistration = (payload) => ({
  type: types.RECEIVE_USER_REGISTRAION,
  payload,
});

/**
 * @description Failure action for registering new user
 */
export const failureUserRegistration = (payload) => ({
  type: types.FAILURE_USER_REGISTRAION,
  payload,
});
