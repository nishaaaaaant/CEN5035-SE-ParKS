import { combineReducers } from "redux";
import homepage from "./registration/Reducer";

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    homepage,
    ...asyncReducers,
  });
}