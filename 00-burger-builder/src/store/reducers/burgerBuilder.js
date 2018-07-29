import {
    ADD_INGREDIENT,
    FETCH_INGREDIENTS_FAILED,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS
} from '../actions/actionTypes';

import { BACON, CHEESE, MEAT, SALAD } from '../../components/Burger/BurgerIngredient/BurgerIngredient';

const INGREDIENT_PRICES = {
    [SALAD] : 0.5,
    [CHEESE] : 0.4,
    [MEAT] : 1.3,
    [BACON] : 0.7
};

const initialState = {
    ingredients : null,
    totalPrice : 4,
    error : false
};

const burgerBuilderReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };

        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };

        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients : action.ingredients,
                error : false
            };

        case FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error : true
            };

        default:
            return state;
    }
};

export default burgerBuilderReducer;