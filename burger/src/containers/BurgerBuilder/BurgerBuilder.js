import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.7,
  cheese: 0.6,
  meat: 1.5,
  bacon: 1.2
}

class BurgerBuilder extends Component {
  
  state = {
    ingredients : {
      meat: 0,
      cheese: 0,
      salad: 0,
      bacon: 0
    },
    price: 3,
    lessBlocked: true,
    purchasable: false,
    purchasing: false,
  }
  
  purchaseHandler = () => {
    this.setState({purchasing: true})
  }
  
  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  
  purchaseContinueHandler = () => {
    alert("Let's continue!")
  }
  
  updatePurhaseState (ingredients) {
    const purchasable = Object.values(ingredients).some(val => val > 0);
    this.setState({purchasable});
  }
  
  addIngredient = (type) => {
    const ingredients = {...this.state.ingredients};
    ingredients[type]++;
    const price = (this.state.price + INGREDIENT_PRICES[type]);
    this.setState({ingredients, price});
    this.updatePurhaseState(ingredients);
  }
  
  removeIngredient = (type) => {
    const ingredients = {...this.state.ingredients};
    if (ingredients[type]) 
    {
      ingredients[type]--;
      const price = (this.state.price - INGREDIENT_PRICES[type]);
      this.setState({ingredients, price});
    }
    this.updatePurhaseState(ingredients);
  }
  
  render() {
    
    const disabledIngr = {...this.state.ingredients};
    
    for (let type in disabledIngr) {
      disabledIngr[type] = disabledIngr[type] <= 0;
    }
    
    return (
      <Aux>
        <Modal show={this.state.purchasing} cancelPurchase={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.price.toFixed(2)}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}/>
        </Modal>
        <div>
          <Burger ingredients={this.state.ingredients}/>
        </div>
        <BuildControls 
          add={this.addIngredient}
          remove={this.removeIngredient}
          disabled={disabledIngr}
          price={this.state.price.toFixed(2)}
          purchasable={this.state.purchasable}
          purchasing={this.purchaseHandler}/>
      </Aux>
    )
  }
}

export default BurgerBuilder;