import { actionTypes } from '../constants';

export function updateAllData(newValue) {
    console.log('dispatch called this func')
    let data = {};
    newValue.forEach(element => {
        const id = element.id.toString();
        data.id = element;
    });
    console.log('data : ', data)
    return {
        type: actionTypes.UPDATE_ALL_DATA,
        payload: data
    }
};

