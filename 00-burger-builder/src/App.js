import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import { authCheckState } from './store/actions';

const asyncAuth = asyncComponent((() => import('./containers/Auth/Auth')));
const asyncCheckout = asyncComponent((() => import('./containers/Checkout/Checkout')));
const asyncOrders = asyncComponent((() => import('./containers/Orders/Orders')));

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    _renderProtectedRoutes() {
        if (!this.props.isAuthenticated) {
            return (
                <Switch>
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/logout" component={Logout} />
                <Route path="/orders" component={asyncOrders} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }

    render() {
        return (
            <div>
                <Layout>
                    {this._renderProtectedRoutes()}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.token !== ''
});

const mapDispatchToProps = dispatch => ({
    onTryAutoSignup : () => dispatch(authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));