import * as actionTypes from '../actions/actionTypes';

const initialState = {
  counter: 0,
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.INCREMENT:
      console.log('Incrementing')
      return {
        counter: state.counter + 1
      }
    case actionTypes.DECREMENT:
      console.log('Decrementing')
      return {
        counter: state.counter - 1
      }
    case actionTypes.ADD:
      console.log('Adding')
      return {
        counter: state.counter + action.value
      }
    case actionTypes.SUBTRACT:
      console.log('Subtracting')
      return {
        counter: state.counter - action.value
      }
    default:
      return state;
  }
}


export default reducer;