import axios from "axios";
import {
  requestUserBookNow,
  receiveUserBookNow,
  failureUserBookNow,
} from "./Actions";

import { BOOK_NOW_API } from "../constants";

/**
 * @description Fetch Home page data
 * @param {} dispatch
 */
export function userBookNow(data) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  return (dispatch) => {
    dispatch(requestUserBookNow());
    // const url = `${BOOK_NOW_API`
    return axios
      .post(BOOK_NOW_API, data, { headers })
      .then((response) => {
        console.log(response);
        alert("Booking Done Successfully!!");
        dispatch(receiveUserBookNow(response?.data?.data?.data));
      })
      .catch((e) => {
        dispatch(failureUserBookNow());
      });
  };
}
