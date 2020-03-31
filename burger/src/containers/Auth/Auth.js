import React from 'react';
import {connect} from 'react-redux';
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
  
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }
  
  switchAuthModeHandler = () => {
      this.setState((prevState) => {
        return {
          isSignup: !prevState.isSignup
        }
      })
    }
  
  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    
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
    
    const errorMessage = (this.props.error) ? this.props.error.message : null;
    
    return (
      <div className={classes.Auth}>
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
    loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);