import React from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { UserIsAuthenticated, UserIsNotAuthenticated } from '../util/wrappers.js';

// Layouts
import App from '../App';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import SignUp from '../components/SignUp';
import Profile from '../components/Profile';

import {
  INDEX_PATH,
  PROFILE_FULL_PATH,
  DASHBOARD_FULL_PATH,
  SIGNUP_FULL_PATH
} from '../routes';

import { configureStore, history } from '../store/configure-store';
import { web3 as web3Actions } from '../actions';

const store = configureStore();

export const generateRootComponent = (_store, _history) => {
  const Root = () => (
    <Provider store={ _store }>
      <Router history={ _history }>
        <App>
          <Route
            path={ INDEX_PATH }
            component={ Home }
            exact
          />
          <Route
            path={ DASHBOARD_FULL_PATH }
            component={ UserIsAuthenticated(Dashboard) }
            exact
          />
          <Route
            path={ SIGNUP_FULL_PATH }
            component={ UserIsNotAuthenticated(SignUp) }
            exact
          />
          <Route
            path={ PROFILE_FULL_PATH }
            component={ UserIsAuthenticated(Profile) }
            exact
          />
        </App>
      </Router>
    </Provider>
  );
  _store.dispatch(web3Actions.initializeWeb3());
  return Root;
};

const RootComponent = generateRootComponent(store, history);

export default RootComponent;
