import { Epic, ofType, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { sessionSelectors } from '../session';
import { RootState } from '../types';

import {
  BoatRampActions,
  boatRampActions,
  BoatRampActionTypes,
} from './actions';
import { BoatRampFetchResponse } from './types';

const url = '/data/boat-ramps';

const fetch: Epic<BoatRampActions> = (
  action$: Observable<BoatRampActions>,
  state$: StateObservable<RootState>
) =>
  action$.pipe(
    ofType(BoatRampActionTypes.FETCH_REQUEST),
    mergeMap(() =>
      ajax
        .getJSON<BoatRampFetchResponse>(url, {
          Authorization: 'Bearer ' + sessionSelectors.token(state$.value),
        })
        .pipe(
          map(response => boatRampActions.fetchResponse(response)),
          takeUntil(action$.pipe(ofType(BoatRampActionTypes.FETCH_CANCELED)))
        )
    )
  );

export const boatRampEpics: Epic<BoatRampActions>[] = [fetch];
