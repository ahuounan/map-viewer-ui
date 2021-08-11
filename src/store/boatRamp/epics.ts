import { Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { Action } from '@libs/redux/action';

import { boatRampActions, BoatRampActionTypes } from './actions';
import { BoatRampFetchResponse } from './types';

const url = './data/boat_ramps.geojson';

const fetch: Epic<Action<BoatRampActionTypes>> = (
  action$: Observable<Action<BoatRampActionTypes>>
) =>
  action$.pipe(
    ofType(BoatRampActionTypes.FETCH_REQUEST),
    mergeMap(() =>
      ajax.getJSON<BoatRampFetchResponse>(url).pipe(
        map(response => boatRampActions.fetchResponse(response)),
        takeUntil(action$.pipe(ofType(BoatRampActionTypes.FETCH_CANCELED)))
      )
    )
  );

export const boatRampEpics: Epic<Action<BoatRampActionTypes>>[] = [fetch];
