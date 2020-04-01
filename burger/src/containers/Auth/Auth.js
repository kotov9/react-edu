import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './Auth.module.css'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'example@site.com'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: ''
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false
      },
    },
    isSignup: true,
  }
  
  // On component did mount check if user got here after trying to order a built burger
  // if not so, redirect user to main page after authentication process
  componentDidMount() {
    if (!this.props.buildingBurger && this.props.redirectAuthPath !== '/') {
      this.props.onSetRedirectAuthPath('/');
    }
  }
  
  checkValidity(value, rules) {
    let isValid = true;
    
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid; 
    }
    
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid; 
    }
    
    return isValid;
  }
  
  inputChangedHandler = (event, inputId) => {
    const updatedControlsForm = {...this.state.controls};
    const updatedControlElement = {...updatedControlsForm[inputId]};
    updatedControlElement.value = event.target.value;
    updatedControlElement.valid = this.checkValidity(
      updatedControlElement.value, updatedControlElement.validation);
    updatedControlElement.touched = true;
    updatedControlsForm[inputId] = updatedControlElement;
    this.setState({controls: updatedControlsForm});
  }
  
  // Call authentication action (-> reducer) to log user up/in on submit
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }
  
  // Switch signin/signup mode
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup
      }
    })
  }
  
  render() {
    // Create array of form inputs to show
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    
    // Map input elements
    let form = formElements.map(element => {
      return (
        <Input 
          key={element.id}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          changed={(event) => this.inputChangedHandler(event, element.id)}
          invalid={!element.config.valid}
          shouldValidate={element.config.validation}
          touched={element.config.touched}/>
      )
    })
    
    if (this.props.loading) {
      form = <Spinner/>;
    }
    
    // Show error if needed
    const errorMessage = (this.props.error) ? this.props.error.message : null;
    // On successful authentication redirect to 'redirectAuthPath' ('/'' or '/checkout')
    const authRedirect = this.props.isAuth ? <Redirect to={this.props.redirectAuthPath}/> : null;
    
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <p>{errorMessage}</p>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {!this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuth: state.auth.token !== null,
    redirectAuthPath: state.auth.redirectAuthPath,
    buildingBurger: state.burgerBuilder.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetRedirectAuthPath: (path) => dispatch(actions.setRedirectAuthPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);