import React, { Fragment } from 'react';

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
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </Fragment>
    );
};

export default OrderSummary;