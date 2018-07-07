import React from 'react'
import Burger from '@/components/Burger'
import Button from '@/components/UI/Button'
import classes from './CheckoutSummary.scss'

const checkoutSummary = ({ingredients, onCheckoutCanceled, onCheckoutContinued}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div style={{padding: '20px', margin: 'auto', maxWidth: '400px', width: '100%'}}>
        <Burger ingredients={ingredients}/>
      </div>
      <Button btnType="Danger" clicked={onCheckoutCanceled}>Cancel</Button>
      <Button btnType="Success" clicked={onCheckoutContinued}>Continue</Button>
    </div>
  )
}

export default checkoutSummary