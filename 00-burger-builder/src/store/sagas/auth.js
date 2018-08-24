import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { logout as logoutSaga, logoutSuceed } from '../actions';

export function* logout(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');

    yield put(logoutSuceed());
}

export function* checkAuthTimeout(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logoutSaga());
}