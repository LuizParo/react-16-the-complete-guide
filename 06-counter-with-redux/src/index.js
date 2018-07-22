import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import reducer from './store/reducer';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = createStore(reducer);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
