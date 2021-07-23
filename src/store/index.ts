import { Action, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import { rootEpic, rootReducer, RootState } from './root';

const epicMiddleware = createEpicMiddleware();

export function configureStore(
  preloadedState: RootState = {}
): Store<RootState, Action> {
  const middlewareEnhancer = applyMiddleware(epicMiddleware);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  epicMiddleware.run(rootEpic);

  return store;
}
