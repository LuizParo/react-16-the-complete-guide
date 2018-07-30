import {
    AUTH_FAIL,
    AUTH_START,
    AUTH_SUCCESS
} from './actionTypes';

export const authStart = () => ({
    type : AUTH_START
});

export const authSuccess = authData => ({
    type : AUTH_SUCCESS,
    authData
});

export const authFail = error => ({
    type : AUTH_FAIL,
    error
});

export const auth = (email, password) => dispatch => {
    dispatch(authStart());
};