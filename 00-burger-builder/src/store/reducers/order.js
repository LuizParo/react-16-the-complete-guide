import {
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_INIT
} from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    orders : [],
    loading : false,
    purchased : false
};

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case PURCHASE_INIT:
            return updateObject(state, { purchased : false });

        case PURCHASE_BURGER_START:
            return updateObject(state, { loading : true });

        case PURCHASE_BURGER_SUCCESS:
            return updateObject(state, {
                loading : false,
                purchased : true,
                orders : state.orders.concat({ ...action.orderData, orderId : action.orderId })
            });

        case PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading : false });

        case FETCH_ORDERS_START:
            return updateObject(state, { loading : true });

        case FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders : action.orders,
                loading : false
            });

        case FETCH_ORDERS_FAIL:
            return updateObject(state, { loading : false });

        default:
            return state;
    }
};

export default orderReducer;