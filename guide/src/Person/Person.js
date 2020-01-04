import React from 'react';
// Import css file to use styling of component from it
// * in this case styling is avaliable globally (in any place this file is imported)
import './Person.css';

const person = props => {
  return (
    // Since class is taken name in js, className is used to define class of html element
    <div className="Person">
      <p onClick={props.clicked}>I'm {props.name}, {props.age} years old.</p>
      <input type="text" value={props.name} onChange={props.changedName}/>
    </div>
  )
}


export default person;