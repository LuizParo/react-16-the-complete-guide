import {
    AUTH,
    AUTH_CHECK_STATE,
    AUTH_CHECK_TIMEOUT,
    AUTH_FAIL,
    AUTH_INITIATE_LOGOUT,
    AUTH_LOGOUT,
    AUTH_START,
    AUTH_SUCCESS,
    SET_AUTH_REDIRECT_PATH
} from './actionTypes';

export const authStart = () => ({ type : AUTH_START });

export const authSuccess = (token, userId) => ({
    type : AUTH_SUCCESS,
    token,
    userId
});

export const authFail = error => ({
    type : AUTH_FAIL,
    error
});

export const logout = () => ({ type : AUTH_INITIATE_LOGOUT });

export const logoutSuceed = () => ({ type : AUTH_LOGOUT });

export const checkAuthTimeout = expirationTime => ({
    type : AUTH_CHECK_TIMEOUT,
    expirationTime
});

export const setAuthRedirectPath = path => ({
    type : SET_AUTH_REDIRECT_PATH,
    path
});

export const authCheckState = () => ({ type : AUTH_CHECK_STATE });

export const auth = (email, password, isSignup) => ({
    type : AUTH,
    email,
    password,
    isSignup
});