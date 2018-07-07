import React from 'react'
import classes from './BuildControl.scss'
import PlusIcon from '@/assets/images/icon-plus.svg'
import MinusIcon from '@/assets/images/icon-minus.svg'
import SaladIcon from '@/assets/images/icon-salad.svg'
import BaconIcon from '@/assets/images/icon-bacon.svg'
import CheeseIcon from '@/assets/images/icon-cheese.svg'
import MeatIcon from '@/assets/images/icon-meat.svg'

const buildControl = ({label, added, removed, disabled}) => {
  let ingredient;
  switch (label) {
    case ('Meat'):
      ingredient = <img src={MeatIcon} alt="meat"/>
      break
    case ('Cheese'):
      ingredient = <img src={CheeseIcon} alt="cheese"/>
      break
    case ('Salad'):
      ingredient = <img src={SaladIcon} alt="salad"/>
      break
    case ('Bacon'):
      ingredient = <img src={BaconIcon} alt="bacon"/>
      break
    default:
      ingredient = null
  }

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{ingredient}</div>
      <button className={classes.Less} onClick={removed} disabled={disabled}><img src={MinusIcon} alt="minus-icon"/></button>
      <button className={classes.More} onClick={added}><img src={PlusIcon} alt="plus-icon"/></button>
    </div>
  )
}

export default buildControl