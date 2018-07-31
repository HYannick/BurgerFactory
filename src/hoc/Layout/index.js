import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux';
import Toolbar from '@/components/Navigation/Toolbar'
import SideDrawer from '@/components/Navigation/SideDrawer'
import classes from './Layout.scss'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }
  sideDrawerOpenedHandler = () => {
    this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}))
  }

  render() {
    return (
      <Fragment>
        <div>
          <SideDrawer open={this.state.showSideDrawer}
                      closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated}/>
          <Toolbar click={this.sideDrawerOpenedHandler} isAuth={this.props.isAuthenticated}/>
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)