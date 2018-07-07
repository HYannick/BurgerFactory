import React, {Component, Fragment} from 'react'
import classes from './Modal.scss'
import Backdrop from '@/components/UI/Backdrop'

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render() {
    const {children, show, modalClosed} = this.props
    return (
      <Fragment>
        <Backdrop show={show} clicked={modalClosed}/>
        <div className={classes.Modal} style={{
          transform: show ? 'translate(-50%, -50%)' : 'translate(-50%, -100%)',
          opacity: show ? 1 : 0,
          visibility: show ? 'visible' : 'hidden'
        }}>
          {children}
        </div>
      </Fragment>
    )
  }
}

export default Modal;