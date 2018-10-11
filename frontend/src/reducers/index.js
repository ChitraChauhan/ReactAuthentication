import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import errorProfileReducer from "./errorProfileReducer";
import authProfileReducer from "./authProfileReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profileErrors: errorProfileReducer,
  authProfile: authProfileReducer
});
