import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
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
        console.log(res)
        dispatch(authSuccess(res.data))
      })
      .catch(error => {
        console.log(error.response)
        dispatch(authFailed(error))
      })
  }
}