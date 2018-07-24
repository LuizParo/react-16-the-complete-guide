import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './actions';

import { BACON, CHEESE, MEAT, SALAD } from '../components/Burger/BurgerIngredient/BurgerIngredient';

const INGREDIENT_PRICES = {
    [SALAD] : 0.5,
    [CHEESE] : 0.4,
    [MEAT] : 1.3,
    [BACON] : 0.7
};

const initialState = {
    ingredients : {
        [SALAD] : 0,
        [CHEESE] : 0,
        [MEAT] : 0,
        [BACON] : 0
    },
    totalPrice : 4
};

const reducer = (state = initialState, action) => {
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

        default:
            return state;
    }
};

export default reducer;