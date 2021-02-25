import { actionTypes, requestOptions, urlOptions } from '../constants';


export function getItems(itemsInfo) {
    let data = {};
    itemsInfo.message.forEach(element => {
        data[element.id] = element;
    });

    return {
        type: actionTypes.GET_ITEMS,
        payload: data
    };
};

export async function addItem(newItem) {

    const postBody = { body: JSON.stringify(newItem) }
    const postResponse = await fetch(urlOptions.POST, { ...requestOptions.POST, ...postBody });
    if (postResponse.status === 201) {
        const json = await postResponse.json();
        const itemInfo = json.message;
        let data = {};
        data[itemInfo.id] = itemInfo;

        return {
            type: actionTypes.ADD_ITEM,
            payload: data
        };
    } else {
        const msg = getErrorMessage(postResponse.status);
        return {
            type: actionTypes.ADD_ITEM_FAILED,
            payload: { message: msg }
        };
    };
};

export async function updateItem(itemInfo) {
    console.log("updateItem called")
    const id = itemInfo.id;

    const putBody = { body: JSON.stringify(itemInfo) }
    const putResponse = await fetch(id, { ...requestOptions.PUT, ...putBody });
    if (putResponse.status === 201) {
        let data = {};
        data[id] = itemInfo;

        return {
            type: actionTypes.UPDATE_ITEM,
            payload: data
        }
    } else {
        const msg = getErrorMessage(putResponse.status);
        return {
            type: actionTypes.UPDATE_ITEM_FAILED,
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
            type: actionTypes.DELETE_ITEM,
            payload: data
        };
    } else {
        const msg = getErrorMessage(deleteResponse.status);
        return {
            type: actionTypes.DELETE_ITEM_FAILED,
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
    return {
        type: actionTypes.IS_AUTHENTICATED,
        payload: { authentication: true, ...user }
    };
};

export function isNotValidUser() {
    return {
        type: actionTypes.IS_AUTHENTICATED_FAILED,
        payload: false
    };
};

export function logOut() {
    return {
        type: actionTypes.LOGOUT,
        payload: false
    };
};


