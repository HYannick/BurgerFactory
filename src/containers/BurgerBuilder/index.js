import React, {Component, Fragment} from 'react'
import Burger from '@/components/Burger'
import {connect} from 'react-redux'
import * as burgerBuilderActions from '@/store/actions'
import BuildControls from '@/components/Burger/BuildControls'
import Modal from '@/components/UI/Modal'
import Spinner from '@/components/UI/Spinner'
import OrderSummary from '@/components/Burger/OrderSummary'
import withErrorHandler from '@/hoc/withErrorHandler'
import classes from './BurgerBuilder.scss'
import axios from '@/axios-orders'


class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentWillMount() {
    this.props.onInitPurchase()
  }

  updatePurcharseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => sum + el, 0)

    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  purchaseContinue = async () => {
    // const queryParams = []
    //     // for (let i in this.props.ingredients) {
    //     //   queryParams.push(encodeURI(i) + '=' + encodeURI(this.props.ingredients[i]))
    //     // }
    //     // queryParams.push('price=' + this.props.totalPrice)
    //     // this.props.history.push({
    //     //   pathname: '/checkout',
    //     //   search: queryParams.join('&')
    //     // })
    this.props.history.push('/checkout')
  }

  render() {
    const {purchasing} = this.state
    const {ingredients, totalPrice} = this.props
    const disabledInfo = {
      ...ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.props.error ?
      <p style={{textAlign: 'center', fontSize: '40px'}}>Ingredients cannot be loaded</p> :
      <Spinner/>
    if (ingredients) {
      orderSummary = (
        <OrderSummary ingredients={ingredients}
                      price={totalPrice.toFixed(2)}
                      purchaseCanceled={this.purchaseCancelHandler}
                      purchaseContinued={this.purchaseContinue}
        />)
      burger = (
        <div className={classes.BurgerBuilder}>
          <div className={classes.BurgerItem}>
            <Burger ingredients={ingredients}/>
          </div>
          <div className={classes.BurgerControls}>
            <BuildControls ingredientAdded={this.props.onIngredientAdded}
                           ingredientRemoved={this.props.onIngredientRemoved}
                           price={totalPrice}
                           disabled={disabledInfo}
                           ordered={this.purchaseHandler}
                           purchasable={this.updatePurcharseState(ingredients)}
            />
          </div>
        </div>
      )
    }

    return (
      <Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initBurger()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))