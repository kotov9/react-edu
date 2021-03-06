import React, {Component} from 'react';
import './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

import Aux from '../hoc/Aux';

// Another way to wrap few of jsx components
import WithClass2 from '../hoc/withClass2';

// Use Context to pass props deep in components tree.
import AuthContext from '../context/AuthContext.js';

class App extends Component {

  constructor(props) {
    super(props);
    
    // Create Refs to component
    this.input1Ref = React.createRef();
    this.input2Ref = React.createRef();
    
    console.log('[App.js] constructor');
  }
  // "state" is a special name in statefull component to keep current state
  state = {
    persons: [
      {name: "Nikita", age: "25"},
      {name: "Boba", age: 23},
      {name: "Banksy", age: 3}
    ],
    info: "Very important info",
    isDisplay: true,
    showCockpit: true,
    counter: 0,
    isAuthenticated: false,
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
    // If setState must change the property by using prev property of state
    // then setState must return func like this
    this.setState((prevState, props) => {
      return {
        persons: persons,
        counter: prevState.counter + 1,
      }
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
  
  loginHandler = () => {
    this.setState({isAuthenticated: true});
  }

  render(){
    console.log('[App.js] render');

    let persons = this.state.isDisplay ? <Persons 
    persons={this.state.persons}
    changed={this.changedNameHandler}
    clicked={this.clickedNameHandler}
  /> : null;

    return (
      <Aux>
        <AuthContext.Provider value={{
                  auth: this.state.isAuthenticated,
                  login: this.loginHandler,
        }}>
          <header className="App-header">
            <button
              onClick={() => this.setState({showCockpit: false})}
            >
              Remove functional component "Cockpit"
            </button>
            {/* Use styled button as a usual react-html element */}
            { this.state.showCockpit ?
              <Cockpit 
                clicked={this.togglePersonsHandler}
                display={this.state.isDisplay}
                person0Length={this.state.persons[0].name.length}
              /> : null}
            {persons}
            <input type="text" 
            ref={this.input1Ref} /> {/* ref is a key attribute that must have a ref value*/}
            <input type="text" 
            ref={this.input2Ref} />
          </header>
        </AuthContext.Provider>
      </Aux>
    );
  }

  componentDidMount(){
    
    // Manipulate component using ref to it
    this.input2Ref.current.focus();
    this.input1Ref.current.value = "Value through ref";
    
    console.log('[App.js] componentDidMound');
  }
}

export default WithClass2(App, "App");
