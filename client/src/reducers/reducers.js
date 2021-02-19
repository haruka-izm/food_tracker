import { actionTypes } from '../constants';

const initialValue = {
    data: {},
    isAuthenticated: false
}

function reducer(state = initialValue, action) {
    switch (action.type) {
        case (actionTypes.GET_ITEMS):
            return {
                ...state,
                data: action.payload
            };

        case (actionTypes.ADD_ITEM):
            return {
                ...state,
                data: { ...state.data, ...action.payload }

            };

        case (actionTypes.ADD_ITEM_FAILED):
            return {
                ...state
            };

        case (actionTypes.UPDATE_ITEM):
            return {
                ...state,
                data: { ...state.data, ...action.payload }
            };

        case (actionTypes.UPDATE_ITEM_FAILED):
            return {
                ...state
            };

        case (actionTypes.DELETE_ITEM):
            return {
                ...state,
                data: action.payload
            };

        case (actionTypes.DELETE_ITEM_FAILED):
            return {
                ...state,
                errorMessage: action.payload
            };

        case (actionTypes.IS_AUTHENTICATED):
            return {
                ...state,
                isAuthenticated: action.payload
            }

        case (actionTypes.IS_AUTHENTICATED_FAILED):
            return {
                ...state
            }

        case (actionTypes.LOGOUT):
            return {
                ...state,
                isAuthenticated: action.payload
            }

        default:
            return state;
    };
}

export default reducer;