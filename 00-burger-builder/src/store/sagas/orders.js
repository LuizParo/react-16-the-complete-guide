import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';

import {
    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFail,
    purchaseBurgerFail,
    purchaseBurgerStart,
    purchaseBurgerSuccess
} from '../actions';

export function* purchaseBurger(action) {
    yield put(purchaseBurgerStart());

    try {
        const response = yield axios.post(`/orders.json?auth=${action.token}`, action.order)
        yield put(purchaseBurgerSuccess(response.data.name, action.order));
    } catch(error) {
        yield put(purchaseBurgerFail(error));
    }
}

export function* fetchOrders(action) {
    put(fetchOrdersStart());

    try {
        const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
        const response = yield axios.get(`/orders.json${queryParams}`);

        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({ ...response.data[key], id : key });
        }

        yield put(fetchOrdersSuccess(fetchedOrders));
    } catch(error) {
        yield put(fetchOrdersFail(error));
    }
}