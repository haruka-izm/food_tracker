import { actionTypes, requestOptions, urlOptions } from '../constants';


export function getItems(itemsInfo) {
    if (itemsInfo.message == "Item not found.") {
        return {
            type: actionTypes.GET_ITEMS_FAILURE,
            payload: {}
        };
    };

    let data = {};
    itemsInfo.message.forEach(element => {
        data[element.id] = element;
    });

    return {
        type: actionTypes.GET_ITEMS_SUCCESS,
        payload: { data: data, householdId: itemsInfo.householdId }
    };
};

export async function addItem(newItem, householdId) {
    const content = { item: newItem, householdId: householdId }
    const postBody = { body: JSON.stringify(content) }
    const postResponse = await fetch(urlOptions.POST_ITEM, { ...requestOptions.POST, ...postBody });

    if (postResponse.status === 201) {
        const json = await postResponse.json();
        const itemInfo = json.message;
        let data = {};
        data[itemInfo.id] = itemInfo;

        return {
            type: actionTypes.ADD_ITEM_SUCCESS,
            payload: data
        };
    } else {
        const msg = getErrorMessage(postResponse.status);
        return {
            type: actionTypes.ADD_ITEM_FAILURE,
            payload: { message: msg }
        };
    };
};

export async function updateItem(itemInfo) {
    const id = itemInfo.id;

    const putBody = { body: JSON.stringify(itemInfo) }
    const putResponse = await fetch(id, { ...requestOptions.PUT, ...putBody });
    if (putResponse.status === 201) {
        let data = {};
        data[id] = itemInfo;

        return {
            type: actionTypes.UPDATE_ITEM_SUCCESS,
            payload: data
        }
    } else {
        const msg = getErrorMessage(putResponse.status);
        return {
            type: actionTypes.UPDATE_ITEM_FAILURE,
            payload: { message: msg }
        };
    };
};

export async function deleteItem(id) {

    const deleteResponse = await fetch(id, requestOptions.DELETE);
    if (deleteResponse.status === 200) {

        const getResponse = await fetch(urlOptions.ITEM_QUERY, requestOptions.GET);
        const json = await getResponse.json();
        const data = json.message;

        return {
            type: actionTypes.DELETE_ITEM_SUCCESS,
            payload: data
        };
    } else {
        const msg = getErrorMessage(deleteResponse.status);
        return {
            type: actionTypes.DELETE_ITEM_FAILURE,
            payload: { message: msg }
        };
    };
};



function getErrorMessage(resStatus) {
    if (resStatus === 400) {
        return "Bad request. Please try again";
    }
    return "Process failed";
};


export function isValidUser(user) {
    const householdName = user.data.householdName;
    return {
        type: actionTypes.IS_AUTHENTICATED_SUCCESS,
        payload: { authentication: true, displayName: householdName, ...user }
    };
};

export function isNotValidUser() {
    return {
        type: actionTypes.IS_AUTHENTICATED_FAILURE,
        payload: { authentication: false }
    };
};


export function isAuthenticating() {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        payload: null
    };
};


export function logOut() {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        payload: null
    };
};


