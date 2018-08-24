import { takeEvery } from 'redux-saga/effects';

import { logout } from './auth';

import { AUTH_INITIATE_LOGOUT } from '../actions/actionTypes';

export function* whatAuth() {
    yield takeEvery(AUTH_INITIATE_LOGOUT, logout);
}