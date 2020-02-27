import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


const OrderSummary = props => {
  
  const symmary = Object.keys(props.ingredients).map(ingr => {
    return (
      <li key={ingr}>
        <span style={{textTransform: 'capitalize'}}>{ingr}: </span>
        {props.ingredients[ingr]}
      </li>
    )
  })
  
  return (
    <Aux>
      <h3>Your order:</h3>
      <ul>
        {symmary}
      </ul>
      <p><strong>Total price: {props.price} $</strong></p>
      <p>Continue to checkout?</p>
      <Button clicked={props.continuePurchase} btnType={"Success"}>Continue</Button>
      <Button clicked={props.cancelPurchase} btnType={"Danger"}>Cancel</Button>
    </Aux>
  )
}


export default OrderSummary;