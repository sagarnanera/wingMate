// root reducer
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import authSlice from "./authReducer";
import bookingReducer from "./bookingReducer";
import eventReducer from "./eventReducer";
import propertyReducer from "./propertyReducer";
import societyReducer from "./societyReducer";
import wingReducer from "./wingReducer";
import residentReducer from "./residentReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  auth: authSlice,
  booking: bookingReducer,
  event: eventReducer,
  property: propertyReducer,
  society: societyReducer,
  wing: wingReducer,
  resident: residentReducer,
});

export default rootReducer;
