import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';

import Auth from './containers/Auth/Auth';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders';

import { authCheckState } from './store/actions';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    _renderProtectedRoutes() {
        if (!this.props.isAuthenticated) {
            return (
                <Switch>
                    <Route path="/auth" component={Auth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout} />
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