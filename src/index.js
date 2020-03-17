import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import history from './app/history'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

var _ = require('lodash');
console.log(_)
ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

