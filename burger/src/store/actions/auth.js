import keys from '../../k.json';


import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authSuccess = (userId, idToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
}

export const authLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkLogoutTimeout = (timeout) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout())
    }, timeout * 1000)
  }
}

export const setRedirectAuthPath = (path) => {
  console.log('PATH: ', path)
  return {
    type: actionTypes.SET_REDIRECT_AUTH_PATH,
    path: path
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const key = keys['firebase-burger'];
    let url = (isSignup) ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key:
                           'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + key;
    const postData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    axios.post(url, postData)
    .then(response => {
      console.log(response.data);
      // Save cridentials to local storage
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('userId', response.data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      // Dispatch success
      dispatch(authSuccess(response.data.localId, response.data.idToken));
      dispatch(checkLogoutTimeout(response.data.expiresIn));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error.response.data.error));
    })
  }
}


export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const expirationDate = localStorage.getItem('expirationDate');
      if (new Date(expirationDate).getTime() > Date.now()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(userId, token));
        dispatch(checkLogoutTimeout((new Date(expirationDate).getTime() - Date.now())/1000))
      } else {
        dispatch(authLogout());
      }
    } else {
      dispatch(authLogout())
    }
  }
  
}