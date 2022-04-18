import { combineReducers } from "redux";
import homepage from "./registration/Reducer";
import login from "./login/Reducer";
import rentersInfo from "./rentersPage/Reducer";

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    homepage,
    login,
    rentersInfo,
    ...asyncReducers,
  });
}
