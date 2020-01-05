import React from 'react';
import Person from './Person/Person';


const persons = (props) => {
  console.log('[Persons.js] render');
  return props.persons.map((person, index) => {
    return (
      <Person 
        name={person.name} 
        age={person.age}
        key={index}       // key property is necessary for react to optimise re-rendering
        // if binding method needs an event argument and some other - use anonymous function
        changed={(event) => props.changed(event, index)}
        // if binding method doesn't needs an event argument, just some other - use bind method
        clicked={() => props.clicked(index)}
        /> 
    )
  });
}


export default persons;