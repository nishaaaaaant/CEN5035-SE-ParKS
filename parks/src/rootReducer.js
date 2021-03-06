import { combineReducers } from "redux";
import homepage from "./registration/Reducer";
import login from "./login/Reducer";
import rentersInfo from "./rentersPage/Reducer";
import buyersPage from "./buyersPage/Reducer";
import userbookings from "./userbooking/Reducer";

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    homepage,
    login,
    rentersInfo,
    buyersPage,
    userbookings,
    ...asyncReducers,
  });
}
