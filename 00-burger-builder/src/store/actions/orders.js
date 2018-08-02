import {
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    PURCHASE_INIT,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS
} from './actionTypes';

import axios from '../../axios-orders';

export const purchaseInit = () => ({
    type : PURCHASE_INIT
});

export const purchaseBurgerSuccess = (orderId, orderData) => ({
    type : PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
});

export const purchaseBurgerFail = error => ({
    type : PURCHASE_BURGER_FAIL,
    error
});

export const purchaseBurgerStart = () => ({
    type : PURCHASE_BURGER_START
});

export const purchaseBurger = (order, token) => dispatch => {
    dispatch(purchaseBurgerStart());

    axios.post(`/orders.json?auth=${token}`, order)
        .then(response => dispatch(purchaseBurgerSuccess(response.data.name, order)))
        .catch(error => dispatch(purchaseBurgerFail(error)));
};

export const fetchOrdersSuccess = orders => ({
    type : FETCH_ORDERS_SUCCESS,
    orders
});

export const fetchOrdersFail = error => ({
    type : FETCH_ORDERS_FAIL,
    error
});

export const fetchOrdersStart = () => ({
    type : FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => dispatch => {
    dispatch(fetchOrdersStart());

    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get(`/orders.json${queryParams}`)
        .then(response => {
            const fetchedOrders = [];

            for (let key in response.data) {
                fetchedOrders.push({ ...response.data[key], id : key });
            }

            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => dispatch(fetchOrdersFail(error)));
};