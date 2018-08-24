import { takeEvery } from 'redux-saga/effects';

import { logout } from './auth';

import { AUTH_INITIATE_LOGOUT } from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(AUTH_INITIATE_LOGOUT, logout);
}