import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
  salad: 0.7,
  cheese: 0.6,
  meat: 1.5,
  bacon: 1.2
}

class BurgerBuilder extends Component {
  
  state = {
    ingredients: null,
    price: 3,
    lessBlocked: true,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }
  
  componentDidMount() {
    axios.get('/ingredients.json')
    .then(response => {
      this.setState({ingredients: response.data});
    })
    .catch(error => this.setState({error: true}));
  }
  
  purchaseHandler = () => {
    this.setState({purchasing: true})
  }
  
  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  
  purchaseContinueHandler = () => {
    // alert("Let's continue!")
    this.setState({loading: true});
    // .json extension is added only to deal with request correctly on firebase side
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: 'Biba',
        address: {
          street: 'Elm st.',
          zipCode: '489243',
          country: 'Sweden'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({loading: false, purchasing: false});
    })
    .catch(error => this.setState({loading: false, purchasing: false}));
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
    
    let burger = this.state.error ? <p>Ingredients can't be loaded...</p> : <Spinner/>;
    let orderSummary = null;
    
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      
      orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.price.toFixed(2)}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase={this.purchaseContinueHandler}/>
    }
    
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }
    
    return (
      <Aux>
        <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);