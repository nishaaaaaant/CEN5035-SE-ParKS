import axios from "axios";
import {
  requestUserBookNow,
  receiveUserBookNow,
  failureUserBookNow,
  requestClientSecret,
  receiveClientSecret,
  failureClientSecret,
  requestBookedSlots,
  recieveBookedSlots,
  failureBookedSlots,
} from "./Actions";

import { BOOK_NOW_API, CLIENT_SECRECT } from "../constants";
import { BOOKED_SLOTS } from "../constants";
import { getUserDetails } from "../common/utils";

/**
 * @description Fetch Home page data
 * @param {} dispatch
 */
export function userBookNow(data) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  return (dispatch) => {
    <div className="0"></div>;
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

/**
 * @description Fetch Client Secret Key
 * @param {} dispatch
 */
export function getClientSecretKey(data) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  return (dispatch) => {
    dispatch(requestClientSecret());
    // const url = `${BOOK_NOW_API`
    return axios
      .post(CLIENT_SECRECT, data, { headers })
      .then((response) => {
        console.log(response);
        alert("Booking Done Successfully!!");
        dispatch(receiveClientSecret(response?.data?.data?.data));
      })
      .catch((e) => {
        dispatch(failureClientSecret());
      });
  };
}

export function fetchTimeSlots(data) {
  return (dispatch) => {
    dispatch(requestBookedSlots());
    return axios
      .post(BOOKED_SLOTS, data)
      .then((response) => {
        console.log(response);
        dispatch(recieveBookedSlots(response?.data?.data?.data));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(failureBookedSlots(e.response.status === 403));
      });
  };
}
