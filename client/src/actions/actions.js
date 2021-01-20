import { actionTypes } from '../constants';

const axios = require('axios');


export function updateAllData(newValue) {
    console.log("updateAllItem called")
    let data = {};
    newValue.forEach(element => {
        const id = element.id.toString();
        data[id] = element;

    });

    return {
        type: actionTypes.UPDATE_ALL_DATA,
        payload: data
    }
};

export async function deleteItem(id) {
    // id: Int
    console.log("deleteItem called");
    console.log('typeof id: ', typeof id);


    const deleteRequestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
    };
    const deleteResponse = await fetch(`http://localhost:8080/api/items/${id}`, deleteRequestOptions);
    if (deleteResponse.status === 200) {
        //const json = await res.json();
        //const message = json.message;

        // to do: fetch all data
        const getRequestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
        };
        const getResponse = await fetch('http://localhost:8080/api/items/query', getRequestOptions)

        const json = await getResponse.json();
        const data = json.message;
        console.log('data looks: ', data);
        const test_data = { '22': {}, '33': {} }
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


    /*
   return (dispatch) => {
       deleteItemAndFetchAllData(dispatch);
   }
   */

}

function _deleteQuery() {

}

function deleteItemAndFetchAllData(dispatch) {
    console.log('helper func called')
    // delete query

    // fetch all data query
    // fetched data = newValue(list?)

    // data = obj of items
}

function getErrorMessage(resStatus) {
    console.log("resStatus: ", resStatus);
    if (resStatus === 400) {
        console.log('400 called');
        return "Item not exist"

    }
    return "Delete failed";
}