import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';


class Checkout extends Component {
  
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  
  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  
  
  render() {
    console.log('Purchased',this.props.purchased )
    const summary = (this.props.ings) ? <div>
      {this.props.purchased ? <Redirect to="/"/> : null}
      <CheckoutSummary 
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinueHandler}/>
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