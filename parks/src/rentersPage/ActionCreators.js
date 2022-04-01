import axios from "axios";
import {
  requestAddNewAddress,
  receiveAddNewAddress,
  failureAddNewAddress,
} from "./Action";

import { NEW_ADDRESS_API } from "../constants";

/**
 * @description Fetch Home page data
 * @param {} dispatch
 */
export function newUserAddNewAddress(data) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  console.log(data);
  return (dispatch) => {
    dispatch(requestAddNewAddress());
    return axios
      .post(NEW_ADDRESS_API, data)
      .then((response) => {
        console.log(response);
        alert("Registraion Successfull!!!");
        dispatch(receiveAddNewAddress(response?.data));
      })
      .catch((e) => {
        console.log(e.response.status === 403);
        alert("User is already registered!!!");
        dispatch(failureAddNewAddress(e.response.status === 403));
      });
  };
}
