import { DELETE_RESULT, STORE_RESULT } from './actionTypes';

const saveResult = result => ({
    type : STORE_RESULT,
    result
});

export const storeResult = result => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(result));
        }, 2000);
    };
};

export const deleteResult = resultId => ({
    type : DELETE_RESULT,
    resultId
});