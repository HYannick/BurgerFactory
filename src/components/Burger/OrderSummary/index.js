import React, {Fragment} from 'react'
import Button from '@/components/UI/Button'

const orderSummary = ({ingredients, purchaseCanceled, purchaseContinued, price}) => {
  const ingredientSummary = Object.keys(ingredients)
    .map(key => {
      return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span>: {ingredients[key]}</li>
    })
  return (
    <Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><b>Total Price: {price}</b></p>
      <p>Continue to checkout?</p>
      <Button clicked={purchaseCanceled} btnType="Danger">CANCEL</Button>
      <Button clicked={purchaseContinued} btnType="Success">CONTINUE</Button>
    </Fragment>
  )
}
export default orderSummary