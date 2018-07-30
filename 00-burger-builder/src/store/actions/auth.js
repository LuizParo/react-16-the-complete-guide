import axios from 'axios';

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

    const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBv27tQOpehxUYxl4jIjukKSxqm1q3BMc0';
    axios.post(url, { email, password, returnSecureToken : true })
        .then(response => dispatch(authSuccess(response.data)))
        .catch(error => dispatch(authFail(error)));
};