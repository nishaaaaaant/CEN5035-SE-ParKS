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
  console.log(JSON.stringify(data));
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
        alert(e.message);
        dispatch(failureAddNewAddress(e.response.status === 403));
      });
  };
}
