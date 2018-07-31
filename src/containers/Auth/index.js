import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Input from '@/components/UI/Input'
import Button from '@/components/UI/Button'
import Spinner from '@/components/UI/Spinner'
import classes from './Auth.scss'
import * as actions from '@/store/actions'

class Auth extends Component {
  state = {
    controls: {
      email: this.generateInputs('input', 'email', 'Mail Address', {required: true}),
      password: this.generateInputs('input', 'password', 'Password', {required: true, minLength: 6}),
    },
    formIsValid: false,
    isSignUp: true,
  }

  generateInputs(elementType, type, placeholder, validationOptions) {
    return {
      elementType,
      elementConfig: {
        type,
        placeholder,
        ...(type === 'select') ? {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        } : null
      },
      value: (type === 'select') ? 'fastest' : '',
      ...{validation: {...validationOptions}},
      valid: (type === 'select'),
      touched: false
    }
  }

  switchOfModeHandler = () => {
    this.setState(prevState => ({isSignUp: !prevState.isSignUp}))
  }
  inputChangedHandler = (e, inputIdentifier) => {
    const updatedControls = {
      ...this.state.controls,
      [inputIdentifier]: {
        ...this.state.controls[inputIdentifier],
        value: e.target.value,
        valid: this.checkValidation(e.target.value, this.state.controls[inputIdentifier].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls})
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
  }


  checkValidation = (value, rules) => {
    let isValid = true
    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  render() {
    const formElArray = []
    for (let key in this.state.controls) {
      formElArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }


    let form = formElArray.map(
      item => (
        <Input key={item.id}
               elementType={item.config.elementType}
               elementConfig={item.config.elementConfig}
               value={item.config.value}
               invalid={!item.config.valid}
               shouldValidate={item.config.touched && item.config.validation}
               changed={(e) => this.inputChangedHandler(e, item.id)}/>
      )
    )

    if (this.props.loading) {
      form = <Spinner/>
    }

    let errorMessage = null

    if(this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }
    let authRedirect = null;
    if(this.props.isAuth) {
      authRedirect = <Redirect to="/"/>
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger"
                clicked={this.switchOfModeHandler}
        >Switch to {this.state.isSignUp ? 'Signin' : 'Signup'}</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignedUp) => dispatch(actions.auth(email, password, isSignedUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)