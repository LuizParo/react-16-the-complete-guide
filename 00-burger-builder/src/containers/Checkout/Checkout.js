import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    _renderSummary() {
        if (!this.props.ingredients) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route path={`${this.props.match.url}/contact-data`} component={ContactData} />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this._renderSummary()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients : state.burgerBuilder.ingredients
});

export default connect(mapStateToProps)(Checkout);