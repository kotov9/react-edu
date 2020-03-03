import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  
  constructor(props) {
    super(props);
    
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    let price = null;
    for (let [key, val] of query.entries()) {
      
      if (key === 'price') {
        price = +val;
        continue;
      }
      ingredients[key] = +val;
    }
    
    this.state = {
      ingredients,
      price
    }
    // this.setState({ingredients: ingredients, price: price});
  }
  
  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinueHandler}/>
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={(props) => <ContactData 
            ingredients={this.state.ingredients}
            price={this.state.price}
            {...props}/>}/>
      </div>
    )
  }
}


export default Checkout;