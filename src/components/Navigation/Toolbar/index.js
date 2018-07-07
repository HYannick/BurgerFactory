import React from 'react'
import classes from './Toolbar.scss'
import Logo from '@/components/Logo'
import NavigationItems from '@/components/Navigation/NavigationItems'
import menuIcon from '@/assets/images/menu.svg'
import avatar from '@/assets/images/avatar.jpg'
const toolbar = ({click}) => (
  <header className={classes.Toolbar}>
    <div className={[classes.Menu, classes.isMobile].join(' ')}>
      <div onClick={click}><img src={menuIcon} alt="Menu Icon" width={40}/></div>
    </div>
    <Logo height="100%"/>
    <div  style={{flex: 1}} className={classes.isDesktop}>
      <NavigationItems/>
    </div>
    <div  className={[classes.Avatar, classes.isMobile].join(' ')}>
      <img src={avatar} alt="Avatar"/>
    </div>
  </header>
)

export default toolbar