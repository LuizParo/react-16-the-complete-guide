import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';

import personReducer from './store/reducers/person';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = createStore(personReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();