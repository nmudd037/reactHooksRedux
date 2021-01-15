import './index.css';
import 'tachyons';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import App from './containers/App';
import { displayRobots, searchRobots } from './reducers';

const logger = createLogger();

const rootReducer = combineReducers({ searchRobots, displayRobots });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));
//console.log(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
