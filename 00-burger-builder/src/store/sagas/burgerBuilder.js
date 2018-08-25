import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';

import {
    fetchIngredientsFail,
    setIngredients as setIngredientsSaga
} from '../actions';

export function* initIngredients(_) {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(setIngredientsSaga(response.data));
    } catch(_) {
        yield put(fetchIngredientsFail())
    }
}