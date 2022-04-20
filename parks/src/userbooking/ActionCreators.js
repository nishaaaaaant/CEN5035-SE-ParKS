import axios from "axios";
import {
  receiveUserBooking,
  requestUserBooking,
  failureUserBooking,
} from "./Action";

import { USER_BOOKING } from "../constants";
import { getUserDetails } from "../common/utils";

export function fetchAllUserBooking() {
  const userId = getUserDetails().userId;

  const data = { userId: userId };
  return (dispatch) => {
    dispatch(requestUserBooking());
    return axios
      .post(USER_BOOKING, data)
      .then((response) => {
        console.log(response);
        dispatch(receiveUserBooking(response?.data?.data?.data));
      })
      .catch((e) => {
        console.log(e.message);
        dispatch(failureUserBooking(e.response.status === 403));
      });
  };
}
