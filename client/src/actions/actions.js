import { actionTypes } from '../constants';

//const axios = require('axios');

const QUERY_URL = 'http://localhost:8080/api/items/query';

export function updateAllData(newValue) {
    console.log("updateAllItem called");
    let data = {};
    newValue.forEach(element => {
        data[element.id] = element;
    });

    return {
        type: actionTypes.UPDATE_ALL_DATA,
        payload: data
    }
};

export async function deleteItem(id) {
    const deleteRequestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
    };
    const deleteResponse = await fetch(id, deleteRequestOptions);
    if (deleteResponse.status === 200) {
        const getRequestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
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
        return "Item not exist";
    }
    return "Delete failed";
}