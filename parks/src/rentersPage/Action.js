import * as types from "./ActionTypes";

/**
 * @description Request action for registering new address
 */
export const requestAddNewAddress = () => ({
  type: types.REQUEST_ADD_NEW_ADDRESS,
});

/**
 * @description Receive action for adding the new address
 */
export const receiveAddNewAddress = (payload) => ({
  type: types.RECEIVE_ADD_NEW_ADDRESS,
  payload,
});

/**
 * @description Failure action for registering new address
 */
export const failureAddNewAddress = (payload) => ({
  type: types.FAILURE_ADD_NEW_ADDRESS,
  payload,
});