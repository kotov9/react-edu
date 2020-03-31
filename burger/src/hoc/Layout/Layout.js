import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import style from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';


class Layout extends Component {
  
  state = {
    showSideDrawer: false,
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }
  
  sideDrawerToggleHandler = () => {
    this.setState((prevState => {
      return {showSideDrawer: !prevState.showSideDrawer}
    }))
  }
  
  render () {
    return (
      <Aux>
        <SideDrawer 
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuth}/>
        <Toolbar drawerToggleHandler={this.sideDrawerToggleHandler} isAuth={this.props.isAuth}/>
        <main className={style.Content}>{this.props.children}</main>
      </Aux>
    )
  }
  
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);