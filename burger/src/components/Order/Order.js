import React from 'react';
import classes from './Order.module.css';


const Order = props => {
  const ingredients = [];
  for (let ingr in props.ingredients) {
    ingredients.push({
      name: ingr,
      amount: props.ingredients[ingr]
    })
  }
  
  const ingredientOutput = ingredients.map(ig => {
    return <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 10px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
      key={ig.name}>{ig.name} ({ig.amount})</span>;
  })
  
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong></p>
    </div>
  )
}


export default Order;