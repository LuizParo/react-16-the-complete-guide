import {
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_INIT
} from '../actions/actionTypes';

const initialState = {
    orders : [],
    loading : false,
    purchased : false
};

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case PURCHASE_INIT:
            return {
                ...state,
                purchased : false
            };

        case PURCHASE_BURGER_START:
            return {
                ...state,
                loading : true
            };

        case PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading : false,
                purchased : true,
                orders : state.orders.concat({ ...action.orderData, orderId : action.orderId })
            };

        case PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading : false
            };

        default:
            return state;
    }
};

export default orderReducer;