import * as actions from '../actions/actions';

export const getUser = () => {
    const user = sessionStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
};

export const getToken = () => {
    const test = sessionStorage.getItem('token');
    console.log("token?: ", test);
    //return sessionStorage.getItem('token') || null;
    return window.sessionStorage.hasOwnProperty('token');
};

export const isAuthenticated = (props) => {


}

export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
};

export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
};