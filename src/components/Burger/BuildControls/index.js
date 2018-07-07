import React from 'react'
import classes from './BuildControls.scss'
import BuildControl from '@/components/Burger/BuildControl'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
]
const buildControls = ({ingredientAdded, ingredientRemoved, disabled, price, purchasable, ordered}) => (
  <div className={classes.BuildControls}>
    <p>Current price: <b>{price.toFixed(2)}</b></p>
    {controls.map(ctrl =>
      <BuildControl key={ctrl.label}
                    label={ctrl.label}
                    type={ctrl.type}
                    added={() => ingredientAdded(ctrl.type)}
                    disabled={disabled[ctrl.type]}
                    removed={() => ingredientRemoved(ctrl.type)}/>)
    }
    <button className={classes.OrderButton} disabled={!purchasable} onClick={ordered}>Order Now</button>
  </div>
)

export default buildControls