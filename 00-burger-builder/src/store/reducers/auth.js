import { AUTH_FAIL, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, SET_AUTH_REDIRECT_PATH } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token : '',
    userId : '',
    error : '',
    loading : false,
    redirectPath : '/'
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

        case AUTH_LOGOUT:
            return updateObject(state, { token : '', userId : '' });

        case SET_AUTH_REDIRECT_PATH:
            return updateObject(state, { redirectPath : action.path });

        default:
            return state;
    }
};

export default authReducer;