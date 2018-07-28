import {
    ADD_INGREDIENT,
    FETCH_INGREDIENTS_FAILED,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS
} from './actionTypes';

import axios from '../../axios-orders';

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

export const initIngredients = () => dispatch => {
    axios.get('/ingredients.json')
        .then(response => dispatch(setIngredients(response.data)))
        .catch(_ => dispatch(fetchIngredientsFail()));
};