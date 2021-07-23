import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { MapEpics } from './map/epics';

export const rootEpic = combineEpics(...MapEpics);
export const rootReducer = combineReducers({});
