import { Action, ActionsUnion } from '@libs/redux/action';
import { createAction } from '@libs/redux/createAction';

import { BoatRampFetchResponse } from './types';

export enum BoatRampActionTypes {
  FETCH_REQUEST = '[BoatRamp] FETCH_REQUEST',
  FETCH_RESPONSE = '[BoatRamp] FETCH_RESPONSE',
  FETCH_CANCELED = '[BoatRamp] FETCH_CANCELED',
  SET_VISIBLE = '[BoatRamp] SET_VISIBLE',
}

export const boatRampActions = {
  fetchRequest: () => createAction(BoatRampActionTypes.FETCH_REQUEST),
  fetchResponse: (response: BoatRampFetchResponse) =>
    createAction(BoatRampActionTypes.FETCH_RESPONSE, response),
  fetchCanceled: (): Action<BoatRampActionTypes.FETCH_CANCELED> =>
    createAction(BoatRampActionTypes.FETCH_CANCELED),
  setVisible: (
    ids: string[]
  ): Action<BoatRampActionTypes.SET_VISIBLE, string[]> =>
    createAction(BoatRampActionTypes.SET_VISIBLE, ids),
};

export type BoatRampActions = ActionsUnion<typeof boatRampActions>;
