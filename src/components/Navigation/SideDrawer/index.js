import React, {Fragment} from 'react'
import Logo from '@/components/Logo'
import NavigationItems from '@/components/Navigation/NavigationItems'
import Backdrop from '@/components/UI/Backdrop'
import classes from './SideDrawer.scss'

const sideDrawer = ({closed, open, isAuth}) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if(open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <Fragment>
      <Backdrop show={open} clicked={closed}/>
      <div className={attachedClasses.join(' ')}>
        <Logo height="10%"/>
        <NavigationItems isAuth={isAuth}/>
      </div>
    </Fragment>
  )
}

export default sideDrawer