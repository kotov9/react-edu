import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class Logout extends React.Component {
  // Logout once user pressed logout button or entered '/logout' in url.
  componentDidMount() {
    this.props.onLogout();
  }
  
  // Redirect to main page
  render () {
    return <Redirect to="/"/>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);