import React, {useState} from 'react';
import './App.css';
// Import stateless component "person"
import Person from './Person/Person';

// Stateless component can be turned into stateful using 'useState' function
const App = () => {

  // useState returns 'personState' and function to set a new 'personState'
  const [personState, personStateSetter] = useState({
    persons: [
      {name: "Nikita", age: 25},
      {name: "Boba", age: 23},
      {name: "Banksy", age: 3}
    ],
    info: "Very important info",
  })

  // Arrow function should be used to execute method with correct context
  const changeNamesHandler = () => {
    // 'personStateSetter' is a function that must be used to change 'personState'
    // it create a new state (info: "Very important info" will be removed)
    personStateSetter({
      persons: [
        {name: "NIKITA", age: 25},
        {name: "BOBA", age: 23},
        {name: "BANKSY", age: 3}
      ],
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={changeNamesHandler}>Uppercase Names</button>
        {/* Adding component just as an HTML element */}
        <Person 
          name={personState.persons[0].name} 
          age={personState.persons[0].age}/>
        <Person 
          name={personState.persons[1].name} 
          age={personState.persons[1].age}/>
        <Person 
          name={personState.persons[2].name} 
          age={personState.persons[2].age}/>
      </header>
    </div>
  );
}

export default App;
