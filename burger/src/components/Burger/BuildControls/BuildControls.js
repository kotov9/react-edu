import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
  {label: "Cheese", type: 'cheese'},
  {label: "Meat", type: 'meat'},
  {label: "Bacon", type: 'bacon'},
  {label: "Salad", type: 'salad'},
]

const BuildControls = props => {
  return (
    <div className={classes.Controls}>
      <p>Price: <strong>{props.price} $</strong></p>
      {controls.map(ing => {
        return <BuildControl 
          label={ing.label} 
          key={ing.label}
          add={() => props.add(ing.type)}
          remove={() => props.remove(ing.type)}
          disabled={props.disabled[ing.type]}/>
      })}
      <button 
        className={classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.purchasing}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
  ) 
}


export default BuildControls;