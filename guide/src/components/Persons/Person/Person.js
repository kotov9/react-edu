import React, { useRef, useEffect, useContext } from 'react';
// Import css file to use styling of component from it
// * in this case styling is avaliable globally (in any place this file is imported)
import styles from './Person.module.css';

import withClass2 from '../../../hoc/withClass2';
import Aux from '../../../hoc/Aux';

// Use Context to pass props deep in components tree.
import AuthContext from '../../../context/AuthContext.js';


const Person = props => {
  
  // ref in functional components can by applied if using react hooks
  // ! component can be manipulated using ref after rendering the DOM
  // that's why it is used in useEffect function here (but it can be used in 
  // another function)
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  }, [])
  
  // Better way of using context in functional component
  const context = useContext(AuthContext);
  
  console.log('[Person.js] render');
  return (
    // place few jsx in array so they could be rendered without use of one all enclosing extra div
    // each element in array MUST have unique key
    <Aux>
      <p key="i1" onClick={props.clicked}>I'm {props.name}, {props.age} years old.</p>
      {context.auth ? <p>Authenticated</p> : <p>Login, please.</p>}
      <input key="i2"
             type="text" 
             value={props.name} 
             onChange={props.changed}
             ref={ref}/>
    </Aux>
  )
}


export default withClass2(Person, styles.Person);