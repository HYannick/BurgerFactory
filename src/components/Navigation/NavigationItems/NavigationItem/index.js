import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './NavigationItem.scss'

const navigationItem = ({children, link, exact}) => (
  <li className={classes.NavigationItem} >
    <NavLink to={link} activeClassName={classes.active} exact={!!exact}>{children}</NavLink>
  </li>
)

export default navigationItem