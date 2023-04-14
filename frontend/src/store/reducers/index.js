import { combineReducers } from "redux";
import userReducer from './userReducer';
import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
    userReducer,
    alertReducer
})
export default rootReducer;
