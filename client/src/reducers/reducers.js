//import { actionTypes } from '../actions/actions';
import { actionTypes } from '../constants';

const initialValue = {
    '0': {}
}

function reducer(state = initialValue, action) {
    switch (action.type) {
        case (actionTypes.UPDATE_ALL_DATA):

            return {
                ...state,
                ...action.payload
            };
        case ('ADD_ITEM'):

            return {
                id: {}
            };

        case ('DELETE_ITEM'):
            console.log("DELETE about to fire")
            return {
                id: {}
            }

        case ('UPDATE_ITEM'):
            return {
                id: {}
            };
        default:
            return state
    }
}

export default reducer;