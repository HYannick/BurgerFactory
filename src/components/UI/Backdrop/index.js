import React from 'react'
import classes from './Backdrop.scss'

const backdrop = ({show, clicked}) => (
   <div className={show ? classes.Backdrop : null} onClick={clicked}></div>
)

export default backdrop;