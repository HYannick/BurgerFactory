import React, {Component} from 'react'
import classes from './BurgerIngredient.scss'
import PropTypes from 'prop-types'

import TopBreadIcon from '@/assets/images/icon-top-bread.svg'
import BottomBreadIcon from '@/assets/images/icon-bottom-bread.svg'
// import BurgerTomatoIcon from '@/assets/images/icon-burger-tomato.svg'
import BurgerSaladIcon from '@/assets/images/icon-burger-salad.svg'
import BurgerCheeseIcon from '@/assets/images/icon-burger-cheese.svg'
import BurgerMeatIcon from '@/assets/images/icon-burger-meat.svg'
import BurgerBaconIcon from '@/assets/images/icon-burger-beacon.svg'


class BurgerIngredient extends Component {
  render() {
    let ingredient = null

    switch (this.props.type) {
      case ('bread-bottom'):
        ingredient = <div className={classes.BreadBottom}><img src={BottomBreadIcon} alt="bottom-bread"/></div>
        break
      case ('bread-top'):
        ingredient = (
          <div className={classes.BreadTop}><img src={TopBreadIcon} alt="top-bread"/></div>
        )
        break
      case ('meat'):
        ingredient = <div className={classes.Meat}><img src={BurgerMeatIcon} alt="meat"/></div>
        break
      case ('cheese'):
        ingredient = <div className={classes.Cheese}><img src={BurgerCheeseIcon} alt="cheese"/></div>
        break
      case ('salad'):
        ingredient = <div className={classes.Salad}><img src={BurgerSaladIcon} alt="salad"/></div>
        break
      case ('bacon'):
        ingredient = <div className={classes.Bacon}><img src={BurgerBaconIcon} alt="bacon"/></div>
        break
      default:
        ingredient = null
    }

    return ingredient
  }
}

BurgerIngredient.propTypes =  {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient