//import { actionTypes } from '../actions/actions';
import { actionTypes } from '../constants';

const initialValue = {
    // id: {id:0, name: ''...}
}

function reducer(state = initialValue, action) {
    switch (action.type) {
        case (actionTypes.UPDATE_ALL_DATA):
            return {
                ...state,
                ...action.payload
            };

        default:
            return state
    };
}

export default reducer;