import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware as RouterMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';
import rootReducer from '../reducers';

const history = createHistory();

const routerMiddleware = RouterMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware, logger];

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
  );
  sagaMiddleware.run(saga);
  return store;
};

export { history, configureStore };
