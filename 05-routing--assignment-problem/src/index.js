import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import App from './App';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';

import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route path="/courses" component={Courses} />
                <Route path="/users" component={Users} />
                <Redirect from="/all-courses" to="/courses" />
            </Switch>
            <Route render={() => <h1>Not found</h1>} />
        </App>
    </BrowserRouter>
    , document.getElementById('root')
);
registerServiceWorker();
