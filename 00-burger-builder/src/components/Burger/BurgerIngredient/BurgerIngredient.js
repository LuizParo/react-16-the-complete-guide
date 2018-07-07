import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

export const BREAD_BOTTOM = 'bread-bottom';
export const BREAD_TOP = 'bread-top';
export const MEAT = 'meat';
export const CHEESE = 'cheese';
export const SALAD = 'salad';
export const BACON = 'bacon';

class BurgerIngredient extends Component {

    render() {
        let ingredient = null;

        switch (this.props.type) {
            case BREAD_BOTTOM:
                ingredient = <div className={classes.BreadBottom}></div>;
                break;

            case BREAD_TOP:
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;

            case MEAT:
                ingredient = <div className={classes.Meat}></div>;
                break;

            case CHEESE:
                ingredient = <div className={classes.Cheese}></div>;
                break;

            case SALAD:
                ingredient = <div className={classes.Salad}></div>;
                break;

            case BACON:
                ingredient = <div className={classes.Bacon}></div>;
                break;

            default:
                ingredient = null;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type : PropTypes.string.isRequired
};

export default BurgerIngredient;