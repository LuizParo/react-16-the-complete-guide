import { AUTH_FAIL, AUTH_START, AUTH_SUCCESS } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token : '',
    userId : '',
    error : '',
    loading : false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_START:
            return updateObject(state, { error : '', loading : true });

        case AUTH_SUCCESS:
            return updateObject(state, {
                token : action.token,
                userId : action.userId,
                error : '',
                loading : false
            });

        case AUTH_FAIL:
            return updateObject(state, { error : action.error, loading : false });

        default:
            return state;
    }
};

export default authReducer;