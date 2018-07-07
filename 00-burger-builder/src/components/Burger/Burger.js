import React from 'react';

import BurgerIngredient, {
    BREAD_BOTTOM,
    BREAD_TOP,
    MEAT,
    CHEESE,
    SALAD,
    BACON
} from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const Burger = props => {
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={BREAD_TOP} />
            <BurgerIngredient type={CHEESE} />
            <BurgerIngredient type={MEAT} />
            <BurgerIngredient type={BREAD_BOTTOM} />
        </div>
    );
};

export default Burger;