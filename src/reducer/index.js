import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import setAvailability from "./setAvailability";
import userDetails from "./userDetails";
import userProfile from "./userProfile";
import ChatReducer from "./ChatReducer";

export default combineReducers({
    auth,
    message,
    setAvailability,
    userDetails,
    userProfile,
    ChatReducer
});
