import { ActionsUnion } from '@libs/redux/action';
import { createAction } from '@libs/redux/createAction';
import { FetchedDataError } from '@libs/redux/templates/fetched';

import { SessionFetchResponse } from './types';

export enum SessionActionTypes {
  FETCH_REQUEST = '[Session] FETCH_REQUEST',
  FETCH_RESPONSE = '[Session] FETCH_RESPONSE',
  FETCH_ERROR = '[Session] FETCH_ERROR',
  FETCH_CANCELED = '[Session] FETCH_CANCELED',
}

export const sessionActions = {
  fetchRequest: (password: string) =>
    createAction(SessionActionTypes.FETCH_REQUEST, password),
  fetchResponse: (response: SessionFetchResponse) =>
    createAction(SessionActionTypes.FETCH_RESPONSE, response),
  fetchCanceled: () => createAction(SessionActionTypes.FETCH_CANCELED),
  fetchError: (error: FetchedDataError) =>
    createAction(SessionActionTypes.FETCH_ERROR, error),
};

export type SessionActions = ActionsUnion<typeof sessionActions>;
