import { AnyAction, combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { boatRampEpics, boatRampReducer } from './boatRamp';
import { mapReducer } from './map';
import { sessionEpics, sessionReducer } from './session';

export const rootEpic = combineEpics<AnyAction>(
  ...boatRampEpics,
  ...sessionEpics
);
export const rootReducer = combineReducers({
  boatRamp: boatRampReducer,
  session: sessionReducer,
  map: mapReducer,
});
