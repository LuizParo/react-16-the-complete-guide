import {
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_SUCCESS
} from './actionTypes';

import axios from '../../axios-orders';

export const purcheseBurgerSuccess = (orderId, orderData) => ({
    type : PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
});

export const purcheseBurgerFail = error => ({
    type : PURCHASE_BURGER_FAIL,
    error
});

export const puchaseBurgerStart = order => dispatch => {
    axios.post('/orders.json', order)
        .then(response => dispatch(purcheseBurgerSuccess(response.data, order)))
        .catch(error => dispatch(purcheseBurgerFail(error)));
};