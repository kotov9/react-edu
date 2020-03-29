import * as actionTypes from './action';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  price: 3,
}

const INGREDIENT_PRICES = {
  salad: 0.7,
  cheese: 0.6,
  meat: 1.5,
  bacon: 1.2
}


export default (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        price: state.price - INGREDIENT_PRICES[action.ingredientName],
      }
    default: return state;
  }
}