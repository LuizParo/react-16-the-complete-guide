import { takeEvery } from 'redux-saga/effects';

import {
    auth,
    authCheckState,
    checkAuthTimeout,
    logout
} from './auth';

import { initIngredients } from './burgerBuilder';

import {
    AUTH,
    AUTH_CHECK_STATE,
    AUTH_CHECK_TIMEOUT,
    AUTH_INITIATE_LOGOUT,
    INIT_INGREDIENTS
} from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(AUTH_INITIATE_LOGOUT, logout);
    yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeout);
    yield takeEvery(AUTH_CHECK_STATE, authCheckState)
    yield takeEvery(AUTH, auth);
}

export function* watchBurgerBuilder() {
    yield takeEvery(INIT_INGREDIENTS, initIngredients);
}