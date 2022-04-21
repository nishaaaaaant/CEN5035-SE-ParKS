import axios from "axios";
import {
  requestAddNewAddress,
  receiveAddNewAddress,
  failureAddNewAddress,
  requestAllAddresses,
  receiveAllAddresses,
  failureAllAddresses,
  requestRentedAddresses,
  receiveRentedAddresses,
  failureRentedAddresses,
} from "./Action";

import {
  NEW_ADDRESS_API,
  ALL_ADDRESS_API,
  RENTED_ADDRESSES_API,
} from "../constants";
import { getUserDetails } from "../common/utils";

/**
 * @description Add new address API
 * @param {} dispatch
 */
export function newUserAddNewAddress(data) {
  // const headers = {
  //   "Access-Control-Allow-Origin": "*",
  // };
  return (dispatch) => {
    dispatch(requestAddNewAddress());
    return axios
      .post(NEW_ADDRESS_API, data)
      .then((response) => {
        debugger
        console.log(response);
        alert("Successfully Added the location");
        dispatch(receiveAddNewAddress(response?.data?.data?.data));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(failureAddNewAddress(e.response.status === 403));
      });
  };
}

/**
 * @description Fetch All addresses data
 * @param {} dispatch
 */
export function fetchAllAddresses() {
  return (dispatch) => {
    dispatch(requestAllAddresses());
    return axios
      .get(ALL_ADDRESS_API)
      .then((response) => {
        console.log(response);
        dispatch(receiveAllAddresses(response?.data?.data?.data));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(failureAllAddresses(e.response.status === 403));
      });
  };
}

/**
 * @description Fetch rented addresses by loggedIn user
 * @param {} dispatch
 */
export function fetchRentedAddresses() {
  const data = {
    UserId: getUserDetails().userId,
  };
  return (dispatch) => {
    dispatch(requestRentedAddresses());
    return axios
      .post(RENTED_ADDRESSES_API, data)
      .then((response) => {
        console.log(response);
        debugger
        dispatch(receiveRentedAddresses(response?.data?.data?.data));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(failureRentedAddresses(e.response.status === 403));
      });
  };
}
