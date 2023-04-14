import { LOGIN , LOGOUT } from '../ActionType';

const getAccessToken = JSON.parse(window.localStorage.getItem('accessToken'));
const userDetails = JSON.parse(window.localStorage.getItem('userDetails'))

const initialState = {
    isLoggedIn : getAccessToken ? true : false,
    userDetails : getAccessToken ? userDetails : null,
    accessToken:getAccessToken
}

const userReducer = (state=initialState,action) => {
    switch(action.type){
        case LOGIN : {
            return {
                isLoggedIn : true,
                userDetails : action.payload.userDetails,
                accessToken:action.payload.accessToken
            }
        }
        case LOGOUT : {
            return {
                isLoggedIn : false,
                userDetails : null,
                accessToken:null
            }
        }
        default : {
            return {
                ...state
            }
        }
        
    }
}
export default userReducer;