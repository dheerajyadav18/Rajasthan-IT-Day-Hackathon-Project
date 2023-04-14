import { LOGIN , LOGOUT , ALERT_HIDE , ALERT_SHOW } from '../ActionType';

export const login = (user) =>{
    return {
        type: LOGIN,
        payload: user,
    };
};

export const logout = () => {
    return {
        type:LOGOUT,
    };
};

export const alert_show = (alert_info) => {
    return {
        type: ALERT_SHOW,
        payload: alert_info,
    };
};

export const alert_hide = () => {
    return {
        type: ALERT_HIDE,
    }
};