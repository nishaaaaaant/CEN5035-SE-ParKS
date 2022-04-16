import axios from "axios";
import {
  requestUserUpdate,
  receiveUserUpdate,
  failureUserUpdate,
} from "./Actions";

import { UPDATE_USER_API } from "../constants";

/**
 * @description Fetch Home page data
 * @param {} dispatch
 */
export function userUpdate(data) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  return (dispatch) => {
    dispatch(requestUserUpdate());
    const url = `${UPDATE_USER_API}/${data.id}`
    return axios
      .put(url, data, { headers })
      .then((response) => {
        console.log(response);
        alert("Update Successfully!!");
        dispatch(receiveUserUpdate(response?.data?.data?.data));
      })
      .catch((e) => {
        dispatch(failureUserUpdate());
      });
  };
}
