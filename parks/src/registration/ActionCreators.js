import axios from "axios";
import {
  requestUserRegistration,
  receiveUserRegistration,
  failureUserRegistration,
} from "./Actions";

import { REGISTRATION_API } from "../constants";

/**
 * @description Fetch Home page data
 * @param {} dispatch
 */
export function newUserRegistraion(data) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  debugger;
  console.log(data);
  return (dispatch) => {
    dispatch(requestUserRegistration());
    return axios
      .post(REGISTRATION_API, data, { headers })
      .then((response) => {
        console.log(response);
        alert("Registraion Successfull!!!");
        dispatch(receiveUserRegistration(response?.data));
      })
      .catch(() => {
        dispatch(failureUserRegistration());
      });
  };
}
