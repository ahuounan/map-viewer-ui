import { Action, ActionsUnion } from '@libs/redux/action';
import { createAction } from '@libs/redux/createAction';

import { SessionFetchResponse } from './types';

export enum SessionActionTypes {
  FETCH_REQUEST = '[Session] FETCH_REQUEST',
  FETCH_RESPONSE = '[Session] FETCH_RESPONSE',
  FETCH_CANCELED = '[Session] FETCH_CANCELED',
}

export const sessionActions = {
  fetchRequest: () => createAction(SessionActionTypes.FETCH_REQUEST),
  fetchResponse: (response: SessionFetchResponse) =>
    createAction(SessionActionTypes.FETCH_RESPONSE, response),
  fetchCanceled: (): Action<SessionActionTypes.FETCH_CANCELED> =>
    createAction(SessionActionTypes.FETCH_CANCELED),
};

export type SessionActions = ActionsUnion<typeof sessionActions>;
