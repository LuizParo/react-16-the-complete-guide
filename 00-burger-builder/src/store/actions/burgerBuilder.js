import {
    ADD_INGREDIENT,
    INIT_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS
} from './actionTypes';

export const addIngredient = ingredientName => ({
    type : ADD_INGREDIENT,
    ingredientName
});

export const removeIngredient = ingredientName => ({
    type : REMOVE_INGREDIENT,
    ingredientName
});

export const setIngredients = ingredients => ({
    type : SET_INGREDIENTS,
    ingredients
});

export const fetchIngredientsFail = () => ({
    type : FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => ({ type : INIT_INGREDIENTS });