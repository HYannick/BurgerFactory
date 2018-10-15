import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../utils";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const addIngredients = (state, action) => {
  const updatedIngredient = {[action.ingName]: state.ingredients[action.ingName] + 1}
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    building: true,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName]
  }
  return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
  const updatedIng = {[action.ingName]: state.ingredients[action.ingName] - 1}
  const updatedIngs = updateObject(state.ingredients, updatedIng)
  const updatedSt = {
    ingredients: updatedIngs,
    building: true,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName]
  }
  return updateObject(state, updatedSt)
}

const setIngredients = (state, action) => {
  const {salad, bacon, cheese, meat} = action.ingredients
  return updateObject(state, {
    ingredients: {salad, bacon, cheese, meat},
    error: false,
    building: false,
    totalPrice: initialState.totalPrice,
  })
}

const fetchIngredients = (state) => {
  return updateObject(state, {error: true})
}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredients(state, action)
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredients(state)
    default:
      return state
  }
}

export default burgerBuilder