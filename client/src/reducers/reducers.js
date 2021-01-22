import { actionTypes } from '../constants';

const initialValue = {
    // id: {id:"API_endpoint_address", name: ''...}
}
function reducer(state = initialValue, action) {
    switch (action.type) {
        case (actionTypes.UPDATE_ALL_DATA):
            console.log('state updated')
            return {
                ...state,
                ...action.payload
            };

        case (actionTypes.ADD_ITEM):
            console.log("add item selected")
            return {
                ...state,
                ...action.payload
            };

        case (actionTypes.ADD_ITEM_FAILED):
            console.log("add item failed")
            return {
                ...state
            };

        case (actionTypes.UPDATE_ITEM):
            console.log("update_item chosen")
            return {
                ...state,
                ...action.payload
            };

        case (actionTypes.UPDATE_ITEM_FAILED):
            console.log("update_item_failed called")
            return {
                ...state
            };

        case (actionTypes.DELETE_ITEM):
            return {
                ...action.payload
            };

        case (actionTypes.DELETE_ITEM_FAILED):
            return {
                ...state,
                errorMessage: action.payload
            };

        default:
            return state;
    };
}

export default reducer;