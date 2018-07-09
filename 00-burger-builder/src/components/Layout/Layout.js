import React, { Component, Fragment } from 'react';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    sideDrawerToggleHandler = () => {
        this.setState(prevState => ({ showSideDrawer : !prevState.showSideDrawer }));
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer : false });
    }

    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;