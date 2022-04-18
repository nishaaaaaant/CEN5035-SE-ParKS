import axios from "axios";
import {
  requestUserLogin,
  receiveUserLogin,
  failureUserLogin,
} from "./Actions";

import { setUserDetails } from "../common/utils";

import { LOGIN_API } from "../constants";

/**
 * @description Fetch Home page data
 * @param {} dispatch
 */
export function newUserLogin(data) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  return (dispatch) => {
    dispatch(requestUserLogin());
    return axios
      .post(LOGIN_API, data, { headers })
      .then((response) => {
        alert("Login Successfull!!!");
        setUserDetails(
          true,
          response?.data?.data?.data?.id,
          response?.data?.data?.data?.Firstname
        );
        dispatch(receiveUserLogin(response?.data?.data?.data));
      })
      .catch((e) => {
        dispatch(failureUserLogin());
      });
  };
}
