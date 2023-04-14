import { ALERT_HIDE , ALERT_SHOW } from "../ActionType"

const initialState = {
    status : false,
    type:"success",
    message:""
}
const alertReducer = (state = initialState, {type, payload})=>{
    switch(type){
        case ALERT_SHOW : {
            return {...state, type: payload.type ,status:true, message:payload.message}
        }
        case ALERT_HIDE:{
            return {...state, type: "success" ,status:false, message:""}
        }
        default:{
            return state;
        }
    }
}
export default alertReducer;