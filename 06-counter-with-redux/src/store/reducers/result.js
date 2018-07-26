import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results : []
};

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT: {
            const newArray = state.results.concat({ id : new Date(), value : action.result });
            return updateObject(state, { results : newArray });
        }

        case actionTypes.DELETE_RESULT: {
            const newArray = state.results.filter(result => result.id !== action.resultId);
            return updateObject(state, { results : newArray });
        }

        default:
            return state
    }
};

export default resultReducer;