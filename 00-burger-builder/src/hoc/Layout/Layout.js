import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

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
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} isAuthenticated={this.props.isAuthenticated} />

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.token !== ''
});

export default connect(mapStateToProps)(Layout);