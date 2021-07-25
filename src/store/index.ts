import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic, rootReducer } from './root';
import { RootActions, RootState } from './types';

const epicMiddleware = createEpicMiddleware();

export function configureStore(
  preloadedState?: RootState
): Store<RootState, RootActions> {
  const middlewareEnhancer = applyMiddleware(epicMiddleware);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  epicMiddleware.run(rootEpic);

  return store;
}
