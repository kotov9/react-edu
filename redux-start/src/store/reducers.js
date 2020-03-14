import * as actionTypes from './actions';

const initialState = {
  counter: 0,
  results: []
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.INCREMENT:
      console.log('Incrementing')
      return {
        results: [...state.results],
        counter: state.counter + 1
      }
    case actionTypes.DECREMENT:
      console.log('Decrementing')
      return {
        results: [...state.results],
        counter: state.counter - 1
      }
    case actionTypes.ADD:
      console.log('Adding')
      return {
        results: [...state.results],
        counter: state.counter + action.value
      }
    case actionTypes.SUBTRACT:
      console.log('Subtracting')
      return {
        results: [...state.results],
        counter: state.counter - action.value
      }
    case actionTypes.STORE_RESULT:
      console.log('Storing result')
      return {
        ...state,
        results: [...state.results, {id: new Date(), value: state.counter}],
      }
    case actionTypes.DELETE_RESULT:
      console.log('Storing result')
      return {
        ...state,
        results: state.results.filter(result => result.id !== action.resultId),
      }
    default:
      break;
  }
  
  return state;
}


export default reducer;