import React from 'react';

import BurgerIngredient, { BREAD_BOTTOM, BREAD_TOP } from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const Burger = props => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])]
                .map((_, index) => <BurgerIngredient key={ingredient + index} type={ingredient} />);
        });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={BREAD_TOP} />
            {transformedIngredients}
            <BurgerIngredient type={BREAD_BOTTOM} />
        </div>
    );
};

export default Burger;