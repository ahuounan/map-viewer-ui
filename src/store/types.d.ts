import { CombinedState, Reducer } from 'redux';

import { rootReducer } from './root';

import { configureStore } from './';

export type Dispatch = ReturnType<typeof configureStore>['dispatch'];

export type RootState = ReturnType<typeof rootReducer>;

export type RootActions = typeof rootReducer extends Reducer<
  CombinedState<RootState>,
  infer A
>
  ? A
  : never;
