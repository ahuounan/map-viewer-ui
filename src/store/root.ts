import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { featureEpics, featureReducer } from './feature';

export const rootEpic = combineEpics(...featureEpics);
export const rootReducer = combineReducers({
  feature: featureReducer,
});
