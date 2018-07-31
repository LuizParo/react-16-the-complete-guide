import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const _renderAuthItem = isAuthenticated => {
    return isAuthenticated
        ? <NavigationItem link="/logout">Logout</NavigationItem>
        : <NavigationItem link="/auth">Authenticate</NavigationItem>
};

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {_renderAuthItem(props.isAuthenticated)}
    </ul>
);

export default NavigationItems;