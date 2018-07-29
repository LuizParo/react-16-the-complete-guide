import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/ui/Spinner/Spinner';

import { fetchOrders } from '../../store/actions';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
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
    loading : state.order.loading
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders : () => dispatch(fetchOrders())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));