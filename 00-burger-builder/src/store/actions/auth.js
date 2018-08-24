import axios from 'axios';

import {
    AUTH_FAIL,
    AUTH_INITIATE_LOGOUT,
    AUTH_START,
    AUTH_SUCCESS,
    SET_AUTH_REDIRECT_PATH
} from './actionTypes';

export const authStart = () => ({
    type : AUTH_START
});

export const authSuccess = (token, userId) => ({
    type : AUTH_SUCCESS,
    token,
    userId
});

export const authFail = error => ({
    type : AUTH_FAIL,
    error
});

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type : AUTH_INITIATE_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => dispatch => {
    setTimeout(() => dispatch(logout()), expirationTime * 1000);
};

export const setAuthRedirectPath = path => ({
    type : SET_AUTH_REDIRECT_PATH,
    path
});

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        return dispatch(logout());
    }

    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
        return dispatch(logout());
    }

    const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
    dispatch(authSuccess(token, localStorage.getItem('userId')));
    dispatch(checkAuthTimeout(expirationTime));
};

export const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart());

    const apiKey = 'AIzaSyBv27tQOpehxUYxl4jIjukKSxqm1q3BMc0';
    const url = isSignup
        ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
        : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

    axios.post(url, { email, password, returnSecureToken : true })
        .then(response => {
            const { idToken, expiresIn, localId } = response.data;
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

            localStorage.setItem('token', idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', localId);

            dispatch(authSuccess(idToken, localId));
            dispatch(checkAuthTimeout(expiresIn));
        })
        .catch(error => dispatch(authFail(error.response.data.error)));
};