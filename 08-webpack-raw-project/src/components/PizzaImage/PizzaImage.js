import React from 'react';

import PizzaImage from '../../assets/pizza.jpg';

import classes from './PizzaImage.css';

const PizzaImage = props => (
    <div className={classes.PizzaImage}>
        <img src={PizzaImage} className={classes.Image} />
    </div>
);

export default PizzaImage;