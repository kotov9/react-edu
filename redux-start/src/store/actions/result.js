import * as actionTypes from './actionTypes';

export const saveResult = result => {
  return {
    type: actionTypes.STORE_RESULT,
    result: result
  }
}

export const storeResult = (result) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(saveResult(result))
    }, 3000)
  }
}

export const deleteResult = (resultId) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultId: resultId
  }
}