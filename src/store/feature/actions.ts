import { Action, ActionsUnion } from '@libs/redux/action';
import { createAction } from '@libs/redux/createAction';

import { FeatureFetchResponse } from './types';

export enum FeatureActionTypes {
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_RESPONSE = 'FETCH_RESPONSE',
  FETCH_CANCELED = 'FETCH_CANCELED',
}

export const featureActions = {
  fetchRequest: (): Action<FeatureActionTypes.FETCH_REQUEST> =>
    createAction(FeatureActionTypes.FETCH_REQUEST),
  fetchResponse: (
    response: FeatureFetchResponse
  ): Action<FeatureActionTypes.FETCH_RESPONSE, FeatureFetchResponse> =>
    createAction(FeatureActionTypes.FETCH_RESPONSE, response),
  fetchCanceled: (): Action<FeatureActionTypes.FETCH_CANCELED> =>
    createAction(FeatureActionTypes.FETCH_CANCELED),
};

export type FeatureActions = ActionsUnion<typeof featureActions>;
