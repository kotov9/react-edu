import * as actionTypes from './actionTypes';

export const saveResult = result => {
  return {
    type: actionTypes.STORE_RESULT,
    result: result
  }
}

export const storeResult = (result) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      console.log(getState().ctr.counter);
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