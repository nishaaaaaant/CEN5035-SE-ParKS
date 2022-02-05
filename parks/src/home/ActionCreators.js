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
export function newUserRegistraion() {
  return (dispatch) => {
    dispatch(requestUserRegistration());
    return axios
      .get(REGISTRATION_API)
      .then((response) => {
          console.log(response);
        dispatch(receiveUserRegistration(response?.data));
      })
      .catch(() => {
        dispatch(failureUserRegistration());
      });
  };
}
