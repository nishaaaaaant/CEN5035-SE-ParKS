import axios from "axios";
import {
  requestAddNewAddress,
  receiveAddNewAddress,
  failureAddNewAddress,
  requestAllAddresses,
  receiveAllAddresses,
  failureAllAddresses,
} from "./Action";

import { NEW_ADDRESS_API, ALL_ADDRESS_API } from "../constants";

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
