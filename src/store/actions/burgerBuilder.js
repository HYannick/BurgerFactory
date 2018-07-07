import * as actionTypes from './actionTypes'
import axios from '@/axios-orders'

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingName
  }
}

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingName
  }
}
export const setIngredients = (ingredients) => {

  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }
}
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}
export const initBurger = () => {
  return async dispatch => {
      try {
        const ingredients = await axios.get('/ingredients.json')
        dispatch(setIngredients(ingredients.data))
      } catch (e) {
        dispatch(fetchIngredientsFailed())
      }
  }
}