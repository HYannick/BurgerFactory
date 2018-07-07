import React from 'react'
// import Burger from '@/components/Burger'
import classes from './Order.scss'

const index = ({ingredients, price}) => {
  const parsedIngredients = []
  for (let name in ingredients) {
    parsedIngredients.push({
      name,
      amount: ingredients[name]
    })
  }

  const ingredientOutput = parsedIngredients.map(ig => (
    <span className={classes.ingredients} key={ig.name}>{ig.name} - ({ig.amount})</span>
  ))
  return (
    <div className={classes.Order}>
      {/*<div className={classes.OrderedBurger}>*/}
        {/*<Burger ingredients={ingredients}/>*/}
      {/*</div>*/}
      <div className={classes.Infos}>
        <p>Ingredients:</p>
        {ingredientOutput}
        <p>Price: <strong>USD {parseFloat(price).toFixed(2)}</strong></p>
      </div>
    </div>
  )
}

export default index