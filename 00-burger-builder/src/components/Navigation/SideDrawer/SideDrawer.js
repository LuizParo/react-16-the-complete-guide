import React, { Fragment } from 'react';

import Backdrop from '../../ui/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.css';

const SideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed} />

            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;