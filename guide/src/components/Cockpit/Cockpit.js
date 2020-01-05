import React from 'react';
import styles from './Cockpit.module.css';

const cockpit = (props) => {
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

export default cockpit;