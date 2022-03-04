import axios from "axios";
import {
  requestUserLogin,
  receiveUserLogin,
  failureUserLogin,
} from "./Actions";

import { LOGIN_API } from "../constants";

/**
 * @description Fetch Home page data
 * @param {} dispatch
 */
export function newUserLogin(data) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  debugger;
  console.log(data);
  return (dispatch) => {
    dispatch(requestUserLogin());
    return axios
      .post(LOGIN_API, data, { headers })
      .then((response) => {
        console.log(response);
        alert("Login Successfull!!!");
        dispatch(receiveUserLogin(response?.data?.data?.data));
      })
      .catch((e) => {
        dispatch(failureUserLogin());
      });
  };
}
