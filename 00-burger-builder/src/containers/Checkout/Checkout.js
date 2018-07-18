import React, { Component } from 'react';

import { SALAD, BACON, CHEESE, MEAT } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients : {
            [SALAD] : 1,
            [CHEESE] : 1,
            [MEAT] : 1,
            [BACON] : 1
        }
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;