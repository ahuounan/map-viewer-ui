import { Epic, ofType } from 'redux-observable';
import { catchError, filter, Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { ActionWithPayload } from '@libs/redux/action';

import { SessionActions, sessionActions, SessionActionTypes } from './actions';
import { SessionFetchResponse } from './types';

const url = process.env.API_HOST + '/auth';

const fetch: Epic<SessionActions> = (action$: Observable<SessionActions>) =>
  action$.pipe(
    filter(
      (
        action
      ): action is ActionWithPayload<
        SessionActionTypes.FETCH_REQUEST,
        string
      > => action.type === SessionActionTypes.FETCH_REQUEST
    ),
    mergeMap(action =>
      ajax
        .post<SessionFetchResponse>(url, null, {
          Authorization:
            'Basic ' + window.btoa(`StandardUser:${action.payload}`),
        })
        .pipe(
          map(response => sessionActions.fetchResponse(response.response)),
          takeUntil(action$.pipe(ofType(SessionActionTypes.FETCH_CANCELED))),
          catchError(r => {
            return of(
              sessionActions.fetchError({
                code: r.status,
                message: r.message,
              })
            );
          })
        )
    )
  );

export const sessionEpics: Epic<SessionActions>[] = [fetch];
