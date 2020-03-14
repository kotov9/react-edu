const redux = require('redux');

const initialState = {
  counter: 0,
}


// Reducer
const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'INC_COUNTER':
      return {
        ...state,
        counter: state.counter + 1
      }
    case 'ADD_COUNTER':
      return {
        ...state,
        counter: state.counter + action.value
      }
    default:
      return state;
  }
}

// Store
const store = redux.createStore(reducer);
console.log(store.getState());

// Subscriptions
store.subscribe(() => {
  console.log("[Subscription]:", store.getState())
})


// Dispatching action
store.dispatch({type: 'INC_COUNTER'});
console.log("Wait...wait...wait...")
store.dispatch({type: 'ADD_COUNTER', value: 10});
// console.log(store.getState())


