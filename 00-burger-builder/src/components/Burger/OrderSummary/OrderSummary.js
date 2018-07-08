import React, { Fragment } from 'react';

import Button from '../../ui/Button/Button';

const OrderSummary = props => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingredient => (
            <li key={ingredient}>
                <span style={{ textTransform : 'captalize' }}>{ingredient}</span>: {props.ingredients[ingredient]}
            </li>
        ));

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>

            <ul>
                {ingredientsSummary}
            </ul>

            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
};

export default OrderSummary;