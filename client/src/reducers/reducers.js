import { actionTypes } from '../actions/actions';

const initialValue = {
    0: {}
}

function reducer(state = initialValue, action) {
    switch (action.type) {
        case ('LOAD_ALL_DATA'):

            return {
                id: {}
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