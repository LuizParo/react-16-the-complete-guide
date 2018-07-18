import React, { Component, Fragment } from 'react';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import { SALAD, BACON, CHEESE, MEAT } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/ui/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    [SALAD] : 0.5,
    [CHEESE] : 0.4,
    [MEAT] : 1.3,
    [BACON] : 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => this.setState({ ingredients : response.data }))
            .catch(error => this.setState({ error : true }));
    }

    updatePurchasedState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(ingredient => ingredients[ingredient])
            .reduce((totalPrice, price) => totalPrice + price, 0);

        this.setState({ purchasable : sum > 0 });
    }

    addIngredientHandler = type => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        updatedIngredients[type] = updatedCount;

        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        });

        this.updatePurchasedState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDeduction;

        updatedIngredients[type] = updatedCount;

        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        });

        this.updatePurchasedState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing : true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing : false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        // this.setState({ loading : true });

        // const order = {
        //     ingredients : this.state.ingredients,
        //     price : this.state.totalPrice,
        //     customer : {
        //         name : 'Luiz Paro',
        //         address : {
        //             street : 'Test Street 1',
        //             zipCode : '41351',
        //             country : 'Brazil'
        //         },
        //         email : 'test@test.com'
        //     },
        //     deliveryMethod : 'fastest'
        // };

        // axios.post('/orders.json', order)
        //     .then(response => this.setState({ loading : false, purchasing : false }))
        //     .catch(error => {
        //         this.setState({ loading : false, purchasing : false });
        //     });
    }

    _renderOrderSummary() {
        if (this.state.loading || !this.state.ingredients) {
            return <Spinner />;
        }

        return <OrderSummary ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;
    }

    _renderBurger() {
        if (!this.state.ingredients) {
            return this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        }

        const disabledInfo = { ...this.state.ingredients };

        for (const info in disabledInfo) {
            disabledInfo[info] = disabledInfo[info] <= 0;
        }

        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients} />

                <BuildControls price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
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

export default withErrorHandler(BurgerBuilder, axios);