import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/ui/Spinner/Spinner';

import {
    addIngredient,
    initIngredients,
    purchaseInit,
    removeIngredient,
    setAuthRedirectPath
} from '../../store/actions';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasing : false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchasedState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(ingredientName => ingredients[ingredientName])
            .reduce((totalPrice, price) => totalPrice + price, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            return this.setState({ purchasing : true });
        }
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    _renderOrderSummary() {
        if (!this.props.ingredients) {
            return <Spinner />;
        }

        return <OrderSummary ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;
    }

    _renderBurger() {
        if (!this.props.ingredients) {
            return this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        }

        const disabledInfo = { ...this.props.ingredients };

        for (const info in disabledInfo) {
            disabledInfo[info] = disabledInfo[info] <= 0;
        }

        return (
            <Fragment>
                <Burger ingredients={this.props.ingredients} />

                <BuildControls price={this.props.totalPrice}
                    purchasable={this.updatePurchasedState(this.props.ingredients)}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    ordered={this.purchaseHandler}
                    disabled={disabledInfo}
                    isAuthenticated={this.props.isAuthenticated} />
            </Fragment>
        );
    }

    render() {
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {this._renderOrderSummary()}
                </Modal>

                {this._renderBurger()}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ingredients : state.burgerBuilder.ingredients,
    totalPrice : state.burgerBuilder.totalPrice,
    error : state.burgerBuilder.error,
    isAuthenticated : state.auth.token !== ''
});

const mapDispatchToProps = dispatch => ({
    onInitIngredients : () => dispatch(initIngredients()),
    onIngredientAdded : ingredientName => dispatch(addIngredient(ingredientName)),
    onIngredientRemoved : ingredientName => dispatch(removeIngredient(ingredientName)),
    onInitPurchase : () => dispatch(purchaseInit()),
    onSetAuthRedirectPath : path => dispatch(setAuthRedirectPath(path))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));