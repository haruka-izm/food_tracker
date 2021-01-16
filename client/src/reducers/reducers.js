//import { actionTypes } from '../actions/actions';
import { actionTypes } from '../constants';

const initialValue = {
    '0': {}
}

function reducer(state = initialValue, action) {
    console.log('reducer called');
    switch (action.type) {
        case (actionTypes.UPDATE_ALL_DATA):
            console.log("right switch statement called")
            return {
                ...state,
                ...action.payload
            };

        default:
            return state
    };
}

export default reducer;