import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './actions';

import { BACON, CHEESE, MEAT, SALAD } from '../components/Burger/BurgerIngredient/BurgerIngredient';

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
                }
            };

        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                }
            };

        default:
            return state;
    }
};

export default reducer;