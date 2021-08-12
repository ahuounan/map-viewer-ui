import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { boatRampEpics, boatRampReducer } from './boatRamp';
import { viewportReducer } from './viewport';

export const rootEpic = combineEpics(...boatRampEpics);
export const rootReducer = combineReducers({
  boatRamp: boatRampReducer,
  viewport: viewportReducer,
});
