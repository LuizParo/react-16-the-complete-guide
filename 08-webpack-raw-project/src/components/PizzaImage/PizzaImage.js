import React from 'react';

import Image from '../../assets/pizza.jpg';

import classes from './PizzaImage.css';

const PizzaImage = props => (
    <div className={classes.PizzaImage}>
        <img src={Image} className={classes.Image} />
    </div>
);

export default PizzaImage;