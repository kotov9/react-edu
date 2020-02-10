import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  
  let tIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, ind) => {
      return (
        <BurgerIngredient 
          type={igKey}
          key={ind+igKey}/>)
    })
  }).reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);
  
  tIngredients = tIngredients.length ? tIngredients :
  <p>Add ingridients to get the nicest burger!</p>
  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={'bread-top'} />
      {tIngredients}
      <BurgerIngredient type={'bread-bottom'} />
    </div>
  )
}

export default Burger;