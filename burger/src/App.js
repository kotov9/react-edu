import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <Aux>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </Aux>
    );
  }
}

export default App;
