import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  userId: null,
  token: null,
  loading: false,
  error: null,
  redirectAuthPath: "/"
}

const authStart = (state, action) => {
  return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    userId: action.userId,
    token: action.idToken,
    loading: false,
    error: null
  })
}

const authFail = (state, action) => {
  return updateObject(state, {error: action.error, loading: false});
}

const authLogout = (state, action) => {
  return updateObject(state, {token: null, userId: null});
}

const setRedirectAuthPath = (state, action) => {
  return updateObject(state, {redirectAuthPath: action.path})
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.SET_REDIRECT_AUTH_PATH: return setRedirectAuthPath(state, action);
    default: return state;
  }
}

export default reducer;