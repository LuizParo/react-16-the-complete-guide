import {
    FETCH_ORDERS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    PURCHASE_INIT,
    PURCHASE_BURGER,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS
} from './actionTypes';

export const purchaseInit = () => ({ type : PURCHASE_INIT });

export const purchaseBurgerSuccess = (orderId, orderData) => ({
    type : PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
});

export const purchaseBurgerFail = error => ({
    type : PURCHASE_BURGER_FAIL,
    error
});

export const purchaseBurgerStart = () => ({ type : PURCHASE_BURGER_START });

export const purchaseBurger = (order, token) => ({
    type : PURCHASE_BURGER,
    order,
    token
});

export const fetchOrdersSuccess = orders => ({
    type : FETCH_ORDERS_SUCCESS,
    orders
});

export const fetchOrdersFail = error => ({
    type : FETCH_ORDERS_FAIL,
    error
});

export const fetchOrdersStart = () => ({ type : FETCH_ORDERS_START });

export const fetchOrders = (token, userId) => ({
    type : FETCH_ORDERS,
    token,
    userId
});