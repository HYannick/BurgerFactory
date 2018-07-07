import React from 'react'
import classes from './Burger.scss'
import BurgerIngredient from "./BurgerIngredient";

const burger = ({ingredients}) => {
  let transformedIngredients = Object.keys(ingredients)
    .map(key => {
      return [...Array(ingredients[key])]
        .map((_, i) => <BurgerIngredient key={key + i} type={key}/>)
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, [])
  if(!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients :)!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
}

export default burger