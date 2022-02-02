import { combineReducers } from "redux";
import homepage from "./home/Reducer";

export default function createReducer(asyncReducers = {}) {
  return combineReducers({
    homepage,
    ...asyncReducers,
  });
}