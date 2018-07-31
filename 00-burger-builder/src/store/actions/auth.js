import axios from 'axios';

import {
    AUTH_FAIL,
    AUTH_LOGOUT,
    AUTH_START,
    AUTH_SUCCESS
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

export const logout = () => ({
    type : AUTH_LOGOUT
});

export const checkAuthTimeout = expirationTime => dispatch => {
    setTimeout(() => dispatch(logout()), expirationTime * 1000);
};

export const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart());

    const apiKey = 'AIzaSyBv27tQOpehxUYxl4jIjukKSxqm1q3BMc0';
    const url = isSignup
        ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
        : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

    axios.post(url, { email, password, returnSecureToken : true })
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => dispatch(authFail(error.response.data.error)));
};