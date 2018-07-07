import React, {Fragment} from 'react'
import Logo from '@/components/Logo'
import NavigationItems from '@/components/Navigation/NavigationItems'
import Backdrop from '@/components/UI/Backdrop'
import classes from './SideDrawer.scss'

const sideDrawer = ({closed, open}) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if(open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <Fragment>
      <Backdrop show={open} clicked={closed}/>
      <div className={attachedClasses.join(' ')}>
        <Logo height="10%"/>
        <NavigationItems/>
      </div>
    </Fragment>
  )
}

export default sideDrawer