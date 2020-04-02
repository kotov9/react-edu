import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
// import Checkout from './containers/Checkout/Checkout';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

const AsyncOrders = AsyncComponent(() => import('./containers/Orders/Orders'));
const AsyncAuth = AsyncComponent(() => import('./containers/Auth/Auth'));
const AsyncCheckout = AsyncComponent(() => import('./containers/Checkout/Checkout'));

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  
  render() {
    let routes = (
      <Switch>
        <Route 
          path="/auth" 
          component={AsyncAuth} />
        <Route 
          path="/" 
          exact
          component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    )
    
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route 
            path="/checkout" 
            component={AsyncCheckout} />
          <Route 
            path="/auth" 
            component={AsyncAuth} />
          <Route 
            path="/logout" 
            component={Logout} />
          <Route 
            path="/orders" 
            exact
            component={AsyncOrders}/>
          <Route 
            path="/" 
            exact
            component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      )
    }
    
    return (
      <Aux>
        <Layout>
          {routes}
        </Layout>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
