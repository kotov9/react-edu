import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  counter: 0,
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.INCREMENT:
      console.log('Incrementing')
      return updateObject(state, {counter: state.counter + 1});
    case actionTypes.DECREMENT:
      console.log('Decrementing')
      return updateObject(state, {counter: state.counter - 1});
    case actionTypes.ADD:
      console.log('Adding')
      return updateObject(state, {counter: state.counter + action.value});
    case actionTypes.SUBTRACT:
      console.log('Subtracting')
      return updateObject(state, {counter: state.counter - action.value});
    default:
      return state;
  }
}


export default reducer;