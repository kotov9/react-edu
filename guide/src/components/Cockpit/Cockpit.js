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
  const person0Length = props.persons0Length;
  useEffect(
    () => console.log('[Cockpit.js] useEffect executed. Person[0] name length was changed'),
    [person0Length]
  );

  // if useEffect should be executed only when rendering called the first time -
  // second argement must be an empty array
  useEffect(
    () => console.log('[Cockpit.js] useEffect executed in first rendering.'),
    []
  );
  
  
  // useEffect is executed when deleting the component in case useEffect returns
  // a function and second argument is defined
  useEffect(() => {
    return () => console.log('[Cockpit.js] useEffect cleanup work.');
  }, [])
  
  // if useEffect returns a function and second argument is not stated, then
  // returning function gets executed before the body of useEffect function
  useEffect(() => {
    console.log('[Cockpit.js] useEffect pre (after) cleanup or something else work.');
    return () => console.log('[Cockpit.js] useEffect cleanup (or something else) work.');
  })


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

// React.memo helps control updating stateless component
// only if it needs to be updated (if props related were changed)
export default React.memo(Cockpit);