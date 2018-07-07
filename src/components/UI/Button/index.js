import React from 'react'
import classes from './Button.scss'

const button = ({children, clicked, btnType, disabled}) => {
  const btnClasses = [classes.Button, classes[btnType]]
  if(disabled) {
    btnClasses.push(classes.Disabled)
  }
  return (
    <button className={btnClasses.join(' ')}
            onClick={clicked} disabled={disabled}>
      {children}
    </button>
  )
}
export default button