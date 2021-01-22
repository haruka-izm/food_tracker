import { actionTypes } from '../constants';

//const axios = require('axios');

const QUERY_URL = 'http://localhost:8080/api/items/query';

export function updateAllData(newValue) {
    let data = {};
    newValue.forEach(element => {
        data[element.id] = element;
    });

    return {
        type: actionTypes.UPDATE_ALL_DATA,
        payload: data
    }
};

export async function addItem(newItem) {
    console.log('add item called')
    const newItemName = newItem.name;
    // check item in DB
    // add the item to DB
    // return obj with id=API endpoint

    const data = { 'id': 'test' }
    return {
        type: actionTypes.ADD_ITEM,
        payload: data
    }
}

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