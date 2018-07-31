import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import Auth from './containers/Auth/Auth';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders';

class App extends Component {

    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/auth" component={Auth} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/" component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;