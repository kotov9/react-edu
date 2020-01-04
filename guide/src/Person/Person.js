import React from 'react';

const person = props => {
  return (
    <div>
      <p>I'm {props.name}, {props.age} years old.</p>
      <input type="text" value={props.name} onChange={props.changedName}/>
    </div>
  )
}


export default person;