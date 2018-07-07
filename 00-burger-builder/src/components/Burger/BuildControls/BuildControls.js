import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import { SALAD, BACON, CHEESE, MEAT } from '../BurgerIngredient/BurgerIngredient';

import classes from './BuildControls.css';

const controls = [
    { label : 'Salad', type : SALAD },
    { label : 'Bacon', type : BACON },
    { label : 'Cheese', type : CHEESE },
    { label : 'Meat', type : MEAT },
];

const BuildControls = props => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>

        {
            controls.map(control => <BuildControl
                key={control.label}
                label={control.label}
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]} />
            )
        }
    </div>
);

export default BuildControls;