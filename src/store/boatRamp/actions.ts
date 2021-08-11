import { Action, ActionsUnion } from '@libs/redux/action';
import { createAction } from '@libs/redux/createAction';

import { BoatRampFetchResponse } from './types';

export enum BoatRampActionTypes {
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_RESPONSE = 'FETCH_RESPONSE',
  FETCH_CANCELED = 'FETCH_CANCELED',
}

export const boatRampActions = {
  fetchRequest: (): Action<BoatRampActionTypes.FETCH_REQUEST> =>
    createAction(BoatRampActionTypes.FETCH_REQUEST),
  fetchResponse: (
    response: BoatRampFetchResponse
  ): Action<BoatRampActionTypes.FETCH_RESPONSE, BoatRampFetchResponse> =>
    createAction(BoatRampActionTypes.FETCH_RESPONSE, response),
  fetchCanceled: (): Action<BoatRampActionTypes.FETCH_CANCELED> =>
    createAction(BoatRampActionTypes.FETCH_CANCELED),
};

export type BoatRampActions = ActionsUnion<typeof boatRampActions>;
