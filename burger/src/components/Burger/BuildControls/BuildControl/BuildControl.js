import React from 'react';
import classes from './BuildControl.module.css';


const BuildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <p>{props.label}</p>
      <button className={classes.More} onClick={props.add}>More</button>
      <button className={classes.Less} onClick={props.remove} disabled={props.disabled}>Less</button>
    </div>
  )
}


export default BuildControl;