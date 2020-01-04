import React, {Component} from 'react';
import './App.css';
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
    isDisplay: true,
  }

  // Arrow function should be used to execute method with correct context
  togglePersonsHandler = () => {
    // 'setState' is a special function that must be used to change 'state'
    // it merges new state with previous
    const isDisplay = !this.state.isDisplay;
    this.setState({
      isDisplay: isDisplay,
    })
  }

  // method to bind input and output for each Person component independently
  changedNameHandler = (event, index) => {
    const persons = [...this.state.persons];
    const person = {...persons[index]};
    person.name = event.target.value;
    persons[index] = person;
    this.setState({
      persons: persons
    })
  }

  // method to remove person from the list if his/her name was clicked
  clickedNameHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons: persons
    })

  }

  render(){

    let persons = null;
    if (this.state.isDisplay) {
      // If state includes an array with necessary for component data, then why not map it and pass to render method?
      persons = this.state.persons.map((person, index) => {
        return (
          <Person 
            name={person.name} 
            age={person.age}
            key={index}       // key property is necessary for react to optimise re-rendering
            // if binding method needs an event argument and some other - use anonymous function
            changedName={(event) => this.changedNameHandler(event, index)}
            // if binding method doesn't needs an event argument, just some other - use bind method
            clicked={this.clickedNameHandler.bind(this, index)}
            /> 
        )
      })
    }

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.togglePersonsHandler}>Toggle display</button>
          {persons}
        </header>
      </div>
    );
  }
}

export default App;
