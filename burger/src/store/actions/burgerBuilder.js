import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

// Create actions regarding burger builder -------------------------------------
export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  }
}

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  }
}

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

// Async func is valid due to 'redux-thunk'
export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
    .then(response => dispatch(setIngredients(response.data)))
    .catch(() => dispatch(fetchIngredientsFailed()));
  }
}