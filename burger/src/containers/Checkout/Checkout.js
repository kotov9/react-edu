import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
  // If ucers refused to order, get back to prev page (main - one with burger builder)
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  
  // If user agree to order, redirect user to contact-data page
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  
  
  render() {
    const summary = (this.props.ings) ? 
      <div>
        {/* if order was sent to server, redirect back to main page */}
        {this.props.purchased ? <Redirect to="/"/> : null}
        {/* Show order summary */}
        <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinue={this.checkoutContinueHandler}/>
        {/* Render here contact data component if user agreed to continue ordering*/}
        <Route 
          path={this.props.match.path + '/contact-data'} 
          component={ContactData}/>
      </div> : <Redirect to="/"/>
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);