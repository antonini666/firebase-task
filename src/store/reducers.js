import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { itemReducer } from "./item/reducers";
import { listReducer } from "./listItems/reducers";

export default combineReducers({
  auth: authReducer,
  item: itemReducer,
  list: listReducer,
});
