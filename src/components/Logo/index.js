import React from 'react'
import burgerLogo from '@/assets/images/hamburger.svg'
import classes from './Logo.scss'
const logo = ({height}) => (
  <div className={classes.Logo} style={{height}}>
    <img src={burgerLogo} alt="My Burger Logo"/>
  </div>
)

export default logo