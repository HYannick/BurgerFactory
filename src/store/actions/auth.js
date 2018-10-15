import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    localId
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5ywfeKBbdDHd260dlOdd44mfCOImv2ys'
    if(!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5ywfeKBbdDHd260dlOdd44mfCOImv2ys'
    }
    axios.post(url, authData)
      .then((res) => {
        dispatch(authSuccess(res.data.idToken, res.data.localId))
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFailed(error.response.data.error))
      })
  }
}