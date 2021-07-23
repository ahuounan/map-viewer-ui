import { configureStore } from './';

export type Dispatch = ReturnType<typeof configureStore>['dispatch'];
