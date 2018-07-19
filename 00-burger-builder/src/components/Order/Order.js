import React from 'react';

import classes from './Order.css';

function extractIngredientsArray(ingredientsAsObject) {
    const ingredients  = [];

    for (let ingredient in ingredientsAsObject) {
        ingredients.push({
            name : ingredient,
            amount : ingredientsAsObject[ingredient]
        });
    }

    return ingredients;
}

const Order = props => {
    const ingredients = extractIngredientsArray(props.ingredients);

    const ingredientsOutput = ingredients.map(ingredient => {
        return <span key={ingredient.name} style={{
                textTransform : 'capitalize',
                display : 'inline-block',
                margin : '0 8px',
                border : '1px solid #ccc',
                padding : '5px'
            }}>
            {ingredient.name}: ({ingredient.amount})
        </span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {(+props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;