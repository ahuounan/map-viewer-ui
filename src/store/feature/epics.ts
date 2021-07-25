import { Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { Action } from '@libs/redux/action';

import { featureActions, FeatureActionTypes } from './actions';
import { FeatureFetchResponse } from './types';

const url = './data/boat_ramps.geojson';

const fetch: Epic<Action<FeatureActionTypes>> = (
  action$: Observable<Action<FeatureActionTypes>>
) =>
  action$.pipe(
    ofType(FeatureActionTypes.FETCH_REQUEST),
    mergeMap(() =>
      ajax.getJSON<FeatureFetchResponse>(url).pipe(
        map(response => featureActions.fetchResponse(response)),
        takeUntil(action$.pipe(ofType(FeatureActionTypes.FETCH_CANCELED)))
      )
    )
  );

export const featureEpics: Epic<Action<FeatureActionTypes>>[] = [fetch];
