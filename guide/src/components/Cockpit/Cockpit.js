import React, { useEffect } from 'react';
import styles from './Cockpit.module.css';

// Case of component name matters (must start with capital one)
const Cockpit = (props) => {

  // useEffect is used in functional component to emulate
  // lifecycle hooks in such components
  // useEffect can be caused any times and without second argument
  // it will be executed every time component gets rerendered
  // first argument is always a function
  // useEffect(() => console.log('[Cockpit.js] useEffect executed.'));

  // useEffect is called when curtain props is changed
  const person0 = props.persons[0]
  useEffect(
    () => console.log('[Cockpit.js] useEffect executed. Person[0] was changed'),
    [person0]
  );

  // if useEffect should be executed only when rendering called the first time -
  // second argement must be an empty array
  useEffect(
    () => console.log('[Cockpit.js] useEffect executed in first rendering.'),
    []
  );


  const buttonStyle = [styles.Button];
  if (props.display) {
    buttonStyle.push(styles.Red);
  } else {
    buttonStyle.push(styles.Green);
  }

  return (
    <button
      onClick={props.clicked}
      className={buttonStyle.join(" ")}
      >Toggle display
    </button>
  )
}

export default Cockpit;