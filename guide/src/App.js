import React, {Component} from 'react';
import './App.css';
// Import stateless component "person"
import Person from './Person/Person';

class App extends Component {

  // "state" is a special name in statefull component to keep current state
  state = {
    persons: [
      {name: "Nikita", age: 25},
      {name: "Boba", age: 23},
      {name: "Banksy", age: 3}
    ],
    info: "Very important info",
  }

  // Arrow function should be used to execute method with correct context
  changeNamesHandler = () => {
    // 'setState' is a special function that must be used to change 'state'
    // it merges new state with previous (info: "Very important info" won't be changed)
    this.setState({
      persons: [
        {name: "NIKITA", age: 25},
        {name: "BOBA", age: 23},
        {name: "BANKSY", age: 3}
      ],
    })
  }

  // Method to dinamically change output when changing input
  changeNameHandler = (event) => {
    this.setState({
      persons: [
        {name: event.target.value, age: 25},
        {name: "BOBA", age: 23},
        {name: "BANKSY", age: 3}
      ],
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.changeNamesHandler}>Uppercase Names</button>
          {/* Adding component just as an HTML element */}
          <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age}
            changedName={this.changeNameHandler}/> {/* method is passed to component related to person[0] - Nikita */}
                                                   {/* person[0].name changes as input changes */}
          <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age}/>
          <Person 
            name={this.state.persons[2].name} 
            age={this.state.persons[2].age}/>
        </header>
      </div>
    );
  }
}

export default App;
