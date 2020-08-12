import { combineReducers } from "redux";
import account from "./account";
import site from "./site";

export default combineReducers({
  account,
  site,
});
