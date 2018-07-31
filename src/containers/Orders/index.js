import React, {Component} from 'react'
import {connect} from 'react-redux'
import Order from '@/components/Order'
import axios from '@/axios-orders'
import withErrorHandler from '@/hoc/withErrorHandler'
import * as ordersActions from '@/store/actions'
import Spinner from '@/components/UI/Spinner'

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token)
  }

  render() {
    let orders = <Spinner/>
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice}/>)}
        </div>
      )
    }
    return orders
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(ordersActions.fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))