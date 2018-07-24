import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/ui/Spinner/Spinner';

import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/actions';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => this.setState({ ingredients : response.data }))
        //     .catch(_ => this.setState({ error : true }));
    }

    updatePurchasedState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
            .reduce((totalPrice, price) => totalPrice + price, 0);

        this.setState({ purchasable : sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let ingredient in this.props.ingredients) {
            queryParams.push(`${encodeURIComponent(ingredient)}=${encodeURIComponent(this.props.ingredients[ingredient])}`);
        }
        queryParams.push(`price=${this.state.totalPrice}`);

        this.props.history.push({
            pathname : '/checkout',
            search : `?${queryParams.join('&')}`
        });
    }

    _renderOrderSummary() {
        if (this.state.loading || !this.props.ingredients) {
            return <Spinner />;
        }

        return <OrderSummary ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;
    }

    _renderBurger() {
        if (!this.props.ingredients) {
            return this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        }

        const disabledInfo = { ...this.props.ingredients };

        for (const info in disabledInfo) {
            disabledInfo[info] = disabledInfo[info] <= 0;
        }

        return (
            <Fragment>
                <Burger ingredients={this.props.ingredients} />

                <BuildControls price={this.props.totalPrice}
                    purchasable={this.state.purchasable}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    ordered={this.purchaseHandler}
                    disabled={disabledInfo} />
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
    ingredients : state.ingredients,
    totalPrice : state.totalPrice
});

const mapDispatchToProps = dispatch => ({
    onIngredientAdded : ingredientName => dispatch({ type : ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved : ingredientName => dispatch({ type : REMOVE_INGREDIENT, ingredientName })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));