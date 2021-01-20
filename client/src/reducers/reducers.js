//import { actionTypes } from '../actions/actions';
import { actionTypes } from '../constants';

const initialValue = {
    // id: {id:0, name: ''...}
    '0': { id: 0 }
}
function reducer(state = initialValue, action) {
    switch (action.type) {
        case (actionTypes.UPDATE_ALL_DATA):
            console.log('state updated')
            return {
                ...state,
                ...action.payload
            };

        case (actionTypes.DELETE_ITEM):
            console.log('case called')
            const key = action.payload;
            console.log('key to be deleted: ', key);

            console.log('initialVal? : ', initialValue)
            const { [key]: value, ...result } = initialValue;

            console.log('...rest:', result)

            return {
                ...result
            }

        default:
            return state
    };
}

export default reducer;