import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@/components/UI/Button'
import Spinner from '@/components/UI/Spinner'
import Input from '@/components/UI/Input'
import axios from '@/axios-orders'
import classes from './ContactData.scss'
import withErrorHandler from '@/hoc/withErrorHandler'
import * as contactActions from '@/store/actions'

class ContactData extends Component {
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

  state = {
    orderForm: {
      name: this.generateInputs('input', 'text', 'Your Name', {required: true}),
      email: this.generateInputs('input', 'email', 'Your Email', {required: true}),
      street: this.generateInputs('input', 'text', 'Street', {required: true}),
      zipCode: this.generateInputs('input', 'text', 'Zip Code', {required: true, minLength: 5, maxLength: 5}),
      country: this.generateInputs('input', 'text', 'Country', {required: true}),
      deliveryMethod: this.generateInputs('select', 'select', 'Your Name')
    },
    formIsValid: false
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
  orderHandler = (e) => {
    e.preventDefault()
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const {totalPrice, ingredients} = this.props
    const order = {
      ingredients,
      totalPrice,
      orderData: formData
    }
    this.props.onOrderBurger(order, this.props.token)
  }

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormEl = {
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormEl.value = e.target.value
    updatedFormEl.valid = this.checkValidation(updatedFormEl.value, updatedFormEl.validation)
    updatedFormEl.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormEl

    let formIsValid = true
    for (let input in updatedOrderForm) {
      formIsValid = updatedOrderForm[input].valid && formIsValid
    }
    this.setState({orderForm: updatedOrderForm, formIsValid})
  }

  render() {
    const formElArray = []
    for (let key in this.state.orderForm) {
      formElArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler} style={{maxWidth: '500px', margin: '20px auto'}}>
        {
          formElArray.map(item => <Input key={item.id}
                                         elementType={item.config.elementType}
                                         elementConfig={item.config.elementConfig}
                                         value={item.config.value}
                                         invalid={!item.config.valid}
                                         shouldValidate={item.config.touched && item.config.validation}
                                         changed={(e) => this.inputChangedHandler(e, item.id)}/>)
        }
        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
      </form>
    )

    if (this.props.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Infos</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (data, token) => dispatch(contactActions.purchaseBurger(data, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))