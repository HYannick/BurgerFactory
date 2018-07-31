import React from 'react'
import classes from './NavigationItems.scss'
import NavigationItem from './NavigationItem'
const navigationItems = ({isAuth}) => (
 <ul className={classes.NavigationItems}>
   <NavigationItem link="/" exact>Burger Builder</NavigationItem>
   {
     isAuth
       ?  <NavigationItem link="/orders">Orders</NavigationItem>
       : null
   }
   {
     isAuth
     ? <NavigationItem link="/logout">Logout</NavigationItem>
     : <NavigationItem link="/auth">Login</NavigationItem>
   }
 </ul>
)

export default navigationItems