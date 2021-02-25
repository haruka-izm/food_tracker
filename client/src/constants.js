import keyMirror from 'keymirror';

export const actionTypes = keyMirror({
    GET_ITEMS: null,
    ADD_ITEM: null,
    ADD_ITEM_FAILED: null,
    DELETE_ITEM: null,
    DELETE_ITEM_FAILED: null,
    UPDATE_ITEM: null,
    UPDATE_ITEM_FAILED: null,

    IS_AUTHENTICATED: null,
    IS_AUTHENTICATED_FAILED: null,
    LOGOUT: null
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
    ITEM_QUERY: 'http://localhost:8080/api/items/query',
    USER_QUERY: 'http://localhost:8080/api/users/me',
    POST: 'http://localhost:8080/api/items',
    LOGIN: 'http://localhost:8080/api/login',
    LOGOUT: 'http://localhost:8080/api/logout',
    SIGNUP: 'http://localhost:8080/api/signup'
};