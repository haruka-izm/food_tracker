import { actionTypes } from '../constants';

export function updateAllData(newValue) {
    let data = {};
    newValue.forEach(element => {
        const id = element.id.toString();
        data[id] = element;

    });
    console.log('data : ', data)
    return {
        type: actionTypes.UPDATE_ALL_DATA,
        payload: data
    }
};

