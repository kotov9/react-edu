import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
import {
  addIngredient, 
  removeIngredient, 
  initIngredients,
  purchaseInit
} from '../../store/actions/index';


class BurgerBuilder extends Component {
  
  state = {
    purchasing: false,
    loading: false,
  }
  
  componentDidMount() {
    this.props.onIngredientsInit();
  }
  
  purchaseHandler = () => {
    this.setState({purchasing: true})
  }
  
  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: '/checkout',
    });
  }
  
  updatePurhaseState (ingredients) {
    return Object.values(ingredients).some(val => val > 0);
  }
  
  render() {
    const disabledIngr = {...this.props.ings};
    
    for (let type in disabledIngr) {
      disabledIngr[type] = disabledIngr[type] <= 0;
    }
    
    let burger = this.props.error ? <p>Ingredients can't be loaded...</p> : <Spinner/>;
    let orderSummary = null;
    
    if (this.props.ings) {
      burger = (
        <Aux>
          <div>
            <Burger ingredients={this.props.ings}/>
          </div>
          <BuildControls 
            add={this.props.onIngredientAdded}
            remove={this.props.onIngredientRemoved}
            disabled={disabledIngr}
            price={this.props.price.toFixed(2)}
            purchasable={this.updatePurhaseState(this.props.ings)}
            purchasing={this.purchaseHandler}/>
        </Aux>
      )
      
      orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price.toFixed(2)}
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    onIngredientsInit: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));