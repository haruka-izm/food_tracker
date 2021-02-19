import keyMirror from 'keymirror';

export var actionTypes = keyMirror({
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
})
