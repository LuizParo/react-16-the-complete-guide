import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios';

import {
    checkAuthTimeout as checkAuthTimeoutSaga,
    authFail,
    authStart,
    authSuccess,
    logout as logoutSaga,
    logoutSuceed
} from '../actions';

export function* logout(_) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put(logoutSuceed());
}

export function* checkAuthTimeout(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logoutSaga());
}

export function* auth(action) {
    yield put(authStart());

    const apiKey = 'AIzaSyBv27tQOpehxUYxl4jIjukKSxqm1q3BMc0';
    const url = action.isSignup
        ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
        : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

    const authData = {
        email : action.email,
        password : action.password,
        returnSecureToken : true
    };

    try {
        const response = yield axios.post(url, authData);
        const { idToken, expiresIn, localId } = response.data;
        const expirationDate = yield new Date(new Date().getTime() + expiresIn * 1000);

        yield localStorage.setItem('token', idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', localId);

        yield put(authSuccess(idToken, localId));
        yield put(checkAuthTimeoutSaga(expiresIn));
    }
    catch(error) {
        yield put(authFail(error.response.data.error));
    }
}