import { enableMapSet } from 'immer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import { configureStore } from './store';
import './globals.css';

enableMapSet();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
