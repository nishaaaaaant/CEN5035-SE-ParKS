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

/**
 * @description action for requesting all addresses
 */
export const requestAllAddresses = () => ({
  type: types.REQUEST_ALL_ADDRESSES,
});

/**
 * @description Receive action for requesting all addresses
 */
export const receiveAllAddresses = (payload) => ({
  type: types.RECEIVE_ALL_ADDRESSES,
  payload,
});

/**
 * @description Failure action for requesting all addresses
 */
export const failureAllAddresses = (payload) => ({
  type: types.FAILURE_ALL_ADDRESSES,
  payload,
});
