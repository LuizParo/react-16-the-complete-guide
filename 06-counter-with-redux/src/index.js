import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const logger = store => next => action => {
    console.log('[Middleware] Dispatching', action);

    const result = next(action);
    console.log('[Middleware] next state', store.getState());

    return result;
};

const rootReducer = combineReducers({
    counter : counterReducer,
    result : resultReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
