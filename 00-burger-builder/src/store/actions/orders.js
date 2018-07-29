import {
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS
} from './actionTypes';

import axios from '../../axios-orders';

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

export const purchaseBurger = order => dispatch => {
    dispatch(purchaseBurgerStart());

    axios.post('/orders.json', order)
        .then(response => dispatch(purchaseBurgerSuccess(response.data.name, order)))
        .catch(error => dispatch(purchaseBurgerFail(error)));
};