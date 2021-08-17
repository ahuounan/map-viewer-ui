import { ActionsUnion } from '@libs/redux/action';
import { createAction } from '@libs/redux/createAction';
import { FetchedDataError } from '@libs/redux/templates/fetched';

import { BoatRampFetchResponse } from './types';

export enum BoatRampActionTypes {
  FETCH_REQUEST = '[BoatRamp] FETCH_REQUEST',
  FETCH_RESPONSE = '[BoatRamp] FETCH_RESPONSE',
  FETCH_CANCELED = '[BoatRamp] FETCH_CANCELED',
  FETCH_ERROR = '[BoatRamp] FETCH_ERROR',
}

export const boatRampActions = {
  fetchRequest: () => createAction(BoatRampActionTypes.FETCH_REQUEST),
  fetchResponse: (response: BoatRampFetchResponse) =>
    createAction(BoatRampActionTypes.FETCH_RESPONSE, response),
  fetchCanceled: () => createAction(BoatRampActionTypes.FETCH_CANCELED),
  fetchError: (error: FetchedDataError) =>
    createAction(BoatRampActionTypes.FETCH_ERROR, error),
};

export type BoatRampActions = ActionsUnion<typeof boatRampActions>;
