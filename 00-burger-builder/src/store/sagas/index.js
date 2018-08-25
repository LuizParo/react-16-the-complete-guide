import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import {
    auth,
    authCheckState,
    checkAuthTimeout,
    logout
} from './auth';

import { initIngredients } from './burgerBuilder';

import { fetchOrders, purchaseBurger } from './orders';

import {
    AUTH,
    AUTH_CHECK_STATE,
    AUTH_CHECK_TIMEOUT,
    AUTH_INITIATE_LOGOUT,
    FETCH_ORDERS,
    INIT_INGREDIENTS,
    PURCHASE_BURGER,
} from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(AUTH, auth),
        takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeout),
        takeEvery(AUTH_CHECK_STATE, authCheckState),
        takeEvery(AUTH_INITIATE_LOGOUT, logout)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(INIT_INGREDIENTS, initIngredients);
}

export function* watchOrders() {
    yield takeEvery(FETCH_ORDERS, fetchOrders);
    yield takeLatest(PURCHASE_BURGER, purchaseBurger);
}