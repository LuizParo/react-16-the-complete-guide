import {
    PURCHASE_BURGER_FAIL,
    PURCHASE_BURGER_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    orders : [],
    loading : false
};

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading : false,
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