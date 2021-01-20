import { actionTypes } from '../constants';

export function updateAllData(newValue) {
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

export function deleteItem(id) {
    console.log("deleteItem called")
    return {
        type: actionTypes.DELETE_ITEM,
        payload: id
    }

}

