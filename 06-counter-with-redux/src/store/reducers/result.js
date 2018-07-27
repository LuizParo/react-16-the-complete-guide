import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results : []
};

const storeResult = (state, action) => {
    const newArray = state.results.concat({ id : new Date(), value : action.result });
    return updateObject(state, { results : newArray });
};

const deleteResult = (state, action) => {
    const newArray = state.results.filter(result => result.id !== action.resultId);
    return updateObject(state, { results : newArray });
};

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return storeResult(state, action);

        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);

        default:
            return state
    }
};

export default resultReducer;