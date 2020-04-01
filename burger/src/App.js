import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  
  render() {
    return (
      <Aux>
        <Layout>
          <Switch>
            <Route 
              path="/checkout" 
              component={Checkout} />
            <Route 
              path="/auth" 
              component={Auth} />
            <Route 
              path="/logout" 
              component={Logout} />
            <Route 
              path="/orders" 
              exact
              component={Orders}/>
            <Route 
              path="/" 
              exact
              component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
  }
}

export default connect(null, mapDispatchToProps)(App);
