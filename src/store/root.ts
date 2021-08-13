import { AnyAction, combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { boatRampEpics, boatRampReducer } from './boatRamp';
import { sessionEpics, sessionReducer } from './session';
import { summaryReducer } from './summary';
import { viewportReducer } from './viewport';

export const rootEpic = combineEpics<AnyAction>(
  ...boatRampEpics,
  ...sessionEpics
);
export const rootReducer = combineReducers({
  boatRamp: boatRampReducer,
  viewport: viewportReducer,
  session: sessionReducer,
  summary: summaryReducer,
});
