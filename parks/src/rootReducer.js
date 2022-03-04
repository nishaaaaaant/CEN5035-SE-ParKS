import { combineReducers } from "redux";
import homepage from "./registration/Reducer";
import login from "./login/Reducer";

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    homepage,
    login,
    ...asyncReducers,
  });
}