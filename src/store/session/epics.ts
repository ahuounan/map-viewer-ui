import { Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { Action } from '@libs/redux/action';

import { sessionActions, SessionActionTypes } from './actions';
import { SessionFetchResponse } from './types';

const url = './data/api_token.json';

const fetch: Epic<Action<SessionActionTypes>> = (
  action$: Observable<Action<SessionActionTypes>>
) =>
  action$.pipe(
    ofType(SessionActionTypes.FETCH_REQUEST),
    mergeMap(() =>
      ajax.getJSON<SessionFetchResponse>(url).pipe(
        map(response => sessionActions.fetchResponse(response)),
        takeUntil(action$.pipe(ofType(SessionActionTypes.FETCH_CANCELED)))
      )
    )
  );

export const sessionEpics: Epic<Action<SessionActionTypes>>[] = [fetch];
