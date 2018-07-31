import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utils'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const authStart = (state, action) => {
  return updateObject(state, {error: null, loading: true})
}

const authSuccess = (state, action) => {
  console.log(action.idToken, action.localId)
  return updateObject(state, {
    error: null,
    loading: false,
    token: action.idToken,
    userId: action.localId
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null
  })
}

const authFailed = (state, action) => {
  return updateObject(state, {error: action.error, loading: false})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action)
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_FAILED:
      return authFailed(state, action)
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action)
    default:
      return state
  }
}

export default reducer