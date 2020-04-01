import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

// Set initial state
const initialState = {
  ingredients: null,
  price: 3,
  error: false,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.7,
  cheese: 0.6,
  meat: 1.5,
  bacon: 1.2
}

// Define functions to use them in reducers
const addIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedPrice = state.price + INGREDIENT_PRICES[action.ingredientName];
  return updateObject(state, {ingredients: updatedIngredients, price: updatedPrice, building: true});
}

const removeIngredient = (state, action) => {
  const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedPrice = state.price - INGREDIENT_PRICES[action.ingredientName];
  return updateObject(state, {ingredients: updatedIngredients, price: updatedPrice, building: true});
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    error: false,
    ingredients: action.ingredients,
    price: 3,
    building: false
  });
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, {error: true});
}

// Define reducer
export default (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
}