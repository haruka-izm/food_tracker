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

    const num = 23;
    const reqOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
    };
    const res = await fetch(`http://localhost:8080/api/items/${num}`, reqOptions);
    if (res.status === 200) {
        //const json = await res.json();
        //const message = json.message;

        // to do: fetch all data
        const reqOptionsForFetch = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }
        };
        const fetchResponse = await fetch('http://localhost:8080/api/items/query', reqOptionsForFetch)

        const test_data = { '22': {}, '33': {} }
        return {
            type: actionTypes.DELETE_ITEM,
            payload: test_data
        };


    }

    if (res.status === 400) {

        console.log('400 called')
        const json = await res.json();

        const test_data = { '22': {}, '33': {} }
        return {
            type: actionTypes.DELETE_ITEM,
            payload: test_data
        };


    } else {
        console.error('API error /api/login ', res);

    }


    /*
   return (dispatch) => {
       deleteItemAndFetchAllData(dispatch);
   }
   */

}

function deleteItemAndFetchAllData(dispatch) {
    console.log('helper func called')
    // delete query

    // fetch all data query
    // fetched data = newValue(list?)

    // data = obj of items
}
