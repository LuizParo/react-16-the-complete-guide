import { takeEvery } from 'redux-saga/effects';

import {
    auth,
    authCheckState,
    checkAuthTimeout,
    logout
} from './auth';

import {
    AUTH,
    AUTH_CHECK_STATE,
    AUTH_CHECK_TIMEOUT,
    AUTH_INITIATE_LOGOUT
} from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(AUTH_INITIATE_LOGOUT, logout);
    yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeout);
    yield takeEvery(AUTH_CHECK_STATE, authCheckState)
    yield takeEvery(AUTH, auth);
}