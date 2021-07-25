import { FeatureActions } from './feature/actions';
import { rootReducer } from './root';

import { configureStore } from './';

export type Dispatch = ReturnType<typeof configureStore>['dispatch'];

export type RootState = ReturnType<typeof rootReducer>;

export type RootActions = FeatureActions;
