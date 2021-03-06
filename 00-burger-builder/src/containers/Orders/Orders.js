import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/ui/Spinner/Spinner';

import { fetchOrders } from '../../store/actions';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        if (this.props.loading) {
            return <Spinner />;
        }

        return (
            <div>
                {
                    this.props.orders.map(order => {
                        return <Order key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}/>
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orders : state.order.orders,
    loading : state.order.loading,
    token : state.auth.token,
    userId : state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders : (token, userId) => dispatch(fetchOrders(token, userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));