import { actionTypes } from '../constants';

const initialValue = {
    data: {}
}
function reducer(state = initialValue, action) {
    switch (action.type) {
        case (actionTypes.GET_ITEMS):
            console.log('state updated')
            return {
                ...state,
                data: action.payload
            };

        case (actionTypes.ADD_ITEM):
            console.log("add item selected")
            return {
                ...state,
                data: action.payload
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
                data: action.payload
            };

        case (actionTypes.UPDATE_ITEM_FAILED):
            console.log("update_item_failed called")
            return {
                ...state
            };

        case (actionTypes.DELETE_ITEM):
            return {
                data: action.payload
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