// root reducer
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import authSlice from "./authReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  auth: authSlice,
});

export default rootReducer;
