import { put } from 'redux-saga/effects';

import { AUTH_LOGOUT } from '../actions/actionTypes';

function* logout(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put({
        type : AUTH_LOGOUT
    });
}