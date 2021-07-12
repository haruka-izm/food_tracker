import { actionTypes } from '../constants';

const initialValue = {
    tableData: {},
    isAuthenticated: null,
    displayName: "",
    householdId: ""
}

function reducer(state = initialValue, action) {
    switch (action.type) {
        case (actionTypes.GET_ITEMS_SUCCESS):
            console.log("redux id: ", action.payload.householdId)

            return {
                ...state,
                tableData: action.payload.data,
                householdId: action.payload.householdId
            };

        case (actionTypes.GET_ITEMS_FAILURE): {
            return {
                ...state
            }
        };

        case (actionTypes.ADD_ITEM_SUCCESS):
            return {
                ...state,
                tableData: { ...state.tableData, ...action.payload }

            };

        case (actionTypes.ADD_ITEM_FAILURE):
            return {
                ...state
            };

        case (actionTypes.UPDATE_ITEM_SUCCESS):
            return {
                ...state,
                tableData: { ...state.tableData, ...action.payload }
            };

        case (actionTypes.UPDATE_ITEM_FAILURE):
            return {
                ...state
            };

        case (actionTypes.DELETE_ITEM_SUCCESS):
            return {
                ...state,
                tableData: action.payload
            };

        case (actionTypes.DELETE_ITEM_FAILURE):
            return {
                ...state,
                errorMessage: action.payload
            };

        case (actionTypes.IS_AUTHENTICATED_SUCCESS):
            return {
                ...state,
                isAuthenticated: action.payload.authentication,
                displayName: action.payload.displayName
            }

        case (actionTypes.IS_AUTHENTICATED_FAILURE):
            return {
                ...state,
                isAuthenticated: action.payload.authentication
            }

        case (actionTypes.LOGOUT_SUCCESS):
            return {
                ...state,
                isAuthenticated: action.payload
            }

        case (actionTypes.IS_AUTHENTICATING):
            return {
                ...state,
                isAuthenticated: action.payload
            }

        default:
            return state;
    };
};

export default reducer;