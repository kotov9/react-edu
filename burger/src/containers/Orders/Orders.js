import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  
  render() {
    return (
      <div>
        {this.props.loading ? <Spinner/> : this.props.orders.map(order => {
          return (
            <Order 
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}/>
          )
        })}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));