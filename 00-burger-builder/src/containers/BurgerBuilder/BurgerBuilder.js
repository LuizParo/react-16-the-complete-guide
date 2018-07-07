import React, { Component, Fragment } from 'react';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import { SALAD, BACON, CHEESE, MEAT } from '../../components/Burger/BurgerIngredient/BurgerIngredient';

const INGREDIENT_PRICES = {
    [SALAD] : 0.5,
    [CHEESE] : 0.4,
    [MEAT] : 1.3,
    [BACON] : 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            [SALAD] : 0,
            [BACON] : 0,
            [CHEESE] : 0,
            [MEAT] : 0
        },
        totalPrice : 4,
        purchasable : false
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

    render() {
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
                    disabled={disabledInfo} />
            </Fragment>
        );
    }
}

export default BurgerBuilder;