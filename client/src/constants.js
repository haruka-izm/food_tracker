import keyMirror from 'keymirror';

export const actionTypes = keyMirror({
    GET_ITEMS_SUCCESS: null,
    GET_ITEMS_FAILURE: null,
    ADD_ITEM_SUCCESS: null,
    ADD_ITEM_FAILURE: null,
    DELETE_ITEM_SUCCESS: null,
    DELETE_ITEM_FAILURE: null,
    UPDATE_ITEM_SUCCESS: null,
    UPDATE_ITEM_FAILURE: null,


    IS_AUTHENTICATING: null,
    IS_AUTHENTICATED_SUCCESS: null,
    IS_AUTHENTICATED_FAILURE: null,

    LOGOUT_SUCCESS: null
});


const HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "http://localhost:3000" };
export const requestOptions = {
    GET: {
        method: 'GET',
        credentials: 'include',
        headers: HEADERS
    },
    POST: {
        method: 'POST',
        headers: HEADERS,
        credentials: 'include',
    },
    PUT: {
        method: 'PUT',
        credentials: 'include',
        headers: HEADERS,
    },
    DELETE: {
        method: 'DELETE',
        credentials: 'include',
        headers: HEADERS
    }
};

export const urlOptions = {
    SERVER: 'http://localhost:8080',
    LOGIN: 'http://localhost:8080/api/login',
    LOGOUT: 'http://localhost:8080/api/logout',
    SIGNUP: 'http://localhost:8080/api/signup',

    // api/items
    POST_ITEM: 'http://localhost:8080/api/items',
    ITEM_QUERY: 'http://localhost:8080/api/items/query',

    // api/users
    PUT_PREFERENCES: 'http://localhost:8080/api/users/preferences',
    USER_QUERY: 'http://localhost:8080/api/users/me',

};