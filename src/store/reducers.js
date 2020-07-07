import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { itemReducer } from "./item/reducers";

export default combineReducers({
  auth: authReducer,
  item: itemReducer,
});
