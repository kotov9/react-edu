import React from 'react';
// Import css file to use styling of component from it
// * in this case styling is avaliable globally (in any place this file is imported)
import './Person.css';


const person = props => {
  console.log('[Person.js] render');
  return (
    // place few jsx in array so they could be rendered without use of one all enclosing extra div
    // each element in array MUST have unique key
    [
      <p key="i1" onClick={props.clicked}>I'm {props.name}, {props.age} years old.</p>,
      <input key="i2" type="text" value={props.name} onChange={props.changed}/>
    ]
  )
}


export default person;