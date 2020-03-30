import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  results: []
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_RESULT:
      console.log('Storing result')
      return updateObject(...state, {results: state.results.concat({id: new Date(), value: action.result})});
    case actionTypes.DELETE_RESULT:
      console.log('Deleting result')
      return updateObject(...state, {results: state.results.filter(result => result.id !== action.resultId)});
    default:
      return state;
  }
}


export default reducer;