import React, { Component } from 'react';
import Person from './Person/Person';


/* Lifecycle update */
// 1. static getDerivedStateFromProps(props, state) // Must be static and return updated state
// 2. shouldComponentUpdate (nextProps, nextState)  // Must return boolean
// 3. render()
// 4. getSnapshotBeforeUpdate(prevProps, prevState) // Must return snapshot/null
// 5. componentDidUpdate (prevProps, prevState, snapshot)

class Persons extends Component {

  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('[Persons.js] shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return {snapshot: "not null"};
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate', snapshot);
  }
  
  render() {
    console.log('[Persons.js] render');
    return this.props.persons.map((person, index) => {
      return (
        <Person 
          name={person.name} 
          age={person.age}
          key={index}       // key property is necessary for react to optimise re-rendering
          // if binding method needs an event argument and some other - use anonymous function
          changed={(event) => this.props.changed(event, index)}
          // if binding method doesn't needs an event argument, just some other - use bind method
          clicked={() => this.props.clicked(index)}
          /> 
      )
    });
  }
  
}


export default Persons;