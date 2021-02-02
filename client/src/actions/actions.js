import { actionTypes } from '../constants';

//const axios = require('axios');

const QUERY_URL = 'http://localhost:8080/api/items/query';
const POST_URL = 'http://localhost:8080/api/items';
const HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" };

export function getItems(itemsInfo) {
    console.log('dispatch called')
    let data = {};
    itemsInfo.message.forEach(element => {
        data[element.id] = element;
    });

    return {
        type: actionTypes.GET_ITEMS,
        payload: { data: data, totalCount: itemsInfo.totalCount }
    }
};

export async function addItem(newItem) {
    console.log('add item called')
    console.log('newItem: ', newItem)
    // check item in DB

    const postRequestOptions = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(newItem)
    };
    const postResponse = await fetch(POST_URL, postRequestOptions);
    if (postResponse.status === 201) {
        const json = await postResponse.json();
        const itemInfo = json.message;
        let data = {};
        data[itemInfo.id] = itemInfo;
        return {
            type: actionTypes.ADD_ITEM,
            payload: data
        }
    } else {
        const msg = getErrorMessage(postResponse.status);
        return {
            type: actionTypes.ADD_ITEM_FAILED,
            payload: { message: msg }
        }
    }
}

export async function updateItem(itemInfo) {
    console.log("updateItem called");
    console.log("itemInfo: ", itemInfo)
    const id = itemInfo.id;

    const putRequestOptions = {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(itemInfo)
    };
    const putResponse = await fetch(id, putRequestOptions);
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
        }
    }
}

export async function deleteItem(id) {
    const deleteRequestOptions = {
        method: 'DELETE',
        headers: HEADERS
    };
    const deleteResponse = await fetch(id, deleteRequestOptions);
    if (deleteResponse.status === 200) {
        const getRequestOptions = {
            method: 'GET',
            headers: HEADERS
        };
        const getResponse = await fetch(QUERY_URL, getRequestOptions);
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
    }
}



function getErrorMessage(resStatus) {
    console.log("resStatus: ", resStatus);
    if (resStatus === 400) {
        console.log('400 called');
        return "Bad request. Please try again";
    }
    return "Process failed";
}