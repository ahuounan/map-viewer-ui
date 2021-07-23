import { rootReducer } from './root';

import { configureStore } from './';


export type Dispatch = ReturnType<typeof configureStore>['dispatch'];

export type RootState = ReturnType<typeof rootReducer>;
