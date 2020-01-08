import React, {Component} from 'react';
import './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

/* Lifecycle update */
// 1. static getDerivedStateFromProps(props, state) // Must be static and return updated state
// 2. shouldComponentUpdate (nextProps, nextState)  // Must return boolean
// 3. render()
// 4. getSnapshotBeforeUpdate(prevProps, prevState) // Must return snapshot/null
// 5. componentDidUpdate (prevProps, prevState, snapshot)


class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }
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

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps');
    return state;
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
    console.log('[App.js] render');

    let persons = this.state.isDisplay ? <Persons 
    persons={this.state.persons}
    changed={this.changedNameHandler}
    clicked={this.clickedNameHandler}
  /> : null;

    return (
      <div className="App">
        <header className="App-header">
          {/* Use styled button as a usual react-html element */}
          <Cockpit 
            clicked={this.togglePersonsHandler}
            display={this.state.isDisplay}
            persons={this.state.persons}
          />
          {persons}
        </header>
      </div>
    );
  }

  componentDidMount(){
    console.log('[App.js] componentDidMound');
  }
}

export default App;
