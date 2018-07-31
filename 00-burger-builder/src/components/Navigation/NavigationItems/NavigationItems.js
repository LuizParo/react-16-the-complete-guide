import React, { Fragment } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const _renderAuthItens = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Fragment>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </Fragment>
        );
    }

    return <NavigationItem link="/auth">Authenticate</NavigationItem>;
};

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {_renderAuthItens(props.isAuthenticated)}
    </ul>
);

export default NavigationItems;