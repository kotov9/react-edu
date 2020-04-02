import React, { Component } from 'react';
import axios from '../../axios-order';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';


// export so this container could be tested (without considering redux)
export class BurgerBuilder extends Component {
  
  state = {
    purchasing: false,  // true if user decided to purchase burger
    loading: false,     // true if loading of ingredients from the server is in the process
  }
  
  // Once component mounted - init ingredients set (load allowed ingredients from the server)
  // Ingredients are available via redux
  componentDidMount() {
    this.props.onIngredientsInit();
  }
  
  // If user clicked order button - show order summury before continue
  purchaseHandler = () => {
    this.setState({purchasing: true})
  }
  
  // If user want to cancel purchase - hide order summary modal window
  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  
  // If user want to make an order - redirect user to checkout page
  // or to signing up page (if not signed up/signed in)
  purchaseContinueHandler = () => {
    // Set initial state 
    this.props.onInitPurchase();
    
    if (this.props.isAuth) {
      this.props.history.push({pathname: '/checkout'});
    } else {
      this.props.onSetRedirectAuthPath('/checkout');
      this.props.history.push({pathname: '/auth'});
    }
  }
  
  // If user has chosen at least one ingredient - make order button clickable
  updatePurhaseState (ingredients) {
    return Object.values(ingredients).some(val => val > 0);
  }
  
  render() {
    // Make 'less' button of ingredients choosing disabled if none ingredients
    // chosen
    const disabledIngr = {...this.props.ings};
    
    for (let type in disabledIngr) {
      disabledIngr[type] = disabledIngr[type] <= 0;
    }
    
    // If ingredients couldn't be loaded from the server - display an error
    let burger = this.props.error ? <p>Ingredients can't be loaded...</p> : <Spinner/>;
    let orderSummary = null;
    
    // If ingredients were loaded - display burger building field
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
            price={this.props.price}
            purchasable={this.updatePurhaseState(this.props.ings)}
            purchasing={this.purchaseHandler}
            isAuth={this.props.isAuth}/>
        </Aux>
      )
      
      orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
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
    price: state.burgerBuilder.price.toFixed(2),
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onIngredientsInit: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectAuthPath: (path) => dispatch(actions.setRedirectAuthPath(path))
  }
}

// Make redux store states and actions available in component 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));