import {
    ADD_INGREDIENT,
    FETCH_INGREDIENTS_FAILED,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS
} from '../actions/actionTypes';

import { BACON, CHEESE, MEAT, SALAD } from '../../components/Burger/BurgerIngredient/BurgerIngredient';

import { updateObject } from '../utility';

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
        case ADD_INGREDIENT: {
            const updatedIngredients = updateObject(state.ingredients, {
                [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            });
            return updateObject(state, {
                ingredients : updatedIngredients,
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            });
        }

        case REMOVE_INGREDIENT: {
            const updatedIngredients = updateObject(state.ingredients, {
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            });
            return updateObject(state, {
                ingredients : updatedIngredients,
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            });
        }

        case SET_INGREDIENTS:
            return updateObject(state, {
                ingredients : action.ingredients,
                totalPrice : 4,
                error : false
            });

        case FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error : true });

        default:
            return state;
    }
};

export default burgerBuilderReducer;