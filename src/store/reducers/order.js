import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../utils";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state, action) => {
  return updateObject(state, {purchased: false})
}

const purchaseBurgerStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    purchased: true
  })
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {id: action.orderId})
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder)
  })
}

const updateLoadingState = (state, action, loading) => {
  return updateObject(state, {loading: false})
}


const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  })
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action)
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action)
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action)
    case actionTypes.PURCHASE_BURGER_FAILED:
      return updateLoadingState(state, null, false)
    case actionTypes.FETCH_ORDERS_START:
      return updateLoadingState(state, null, true)
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action)
    case actionTypes.FETCH_ORDERS_FAILED:
      return updateLoadingState(state, null, false)
    default:
      return state
  }
}

export default orderReducer