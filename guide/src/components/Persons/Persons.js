import React, { PureComponent } from 'react';
import Person from './Person/Person';

// Use prop-types to observe what props are passed to component
// and notify developer if prop type is wrong
import PropTypes from 'prop-types';

/* Lifecycle update */
// 1. static getDerivedStateFromProps(props, state) // Must be static and return updated state
// 2. shouldComponentUpdate (nextProps, nextState)  // Must return boolean
// 3. render()
// 4. getSnapshotBeforeUpdate(prevProps, prevState) // Must return snapshot/null
// 5. componentDidUpdate (prevProps, prevState, snapshot)

class Persons extends PureComponent {

  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  // !!! IN PURE COMPONENT PROPS CHECK IS EXECUTED FOR EVERY PROP
  // AND IF ANY WAS CHANGED, THEN COMPONENT GETS UPDATED
  
  // Update component only if it's necessary (of props has changed)
  // That's one way of performance optimization
  // shouldComponentUpdate (nextProps, nextState) {
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   return nextProps.persons !== this.props.persons;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return {snapshot: "not null"};
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate', snapshot);
  }
  
  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
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

Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  clicked: PropTypes.func,
}


export default Persons;