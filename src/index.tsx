import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import merchantsReducer from './modules/merchants/reducer';
import thunk from 'redux-thunk';
require('dotenv').config();
// for the sake of simplicity
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  merchantsReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
  );

const Root: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
