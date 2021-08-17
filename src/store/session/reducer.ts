import produce from 'immer';

import { SessionActions, SessionActionTypes } from './actions';
import { SessionState } from './types';

const initialState: SessionState = {
  fetchStatus: 'idle',
  error: null,
  token: null,
};

export function sessionReducer(
  state: SessionState = initialState,
  action: SessionActions
): SessionState {
  switch (action.type) {
    case SessionActionTypes.FETCH_REQUEST: {
      return produce(state, (draft: SessionState) => {
        draft.fetchStatus = 'fetching';
      });
    }
    case SessionActionTypes.FETCH_CANCELED: {
      return produce(state, (draft: SessionState) => {
        draft.fetchStatus = 'idle';
      });
    }
    case SessionActionTypes.FETCH_RESPONSE: {
      return produce(state, (draft: SessionState) => {
        draft.fetchStatus = 'idle';
        draft.token = action.payload.token;
      });
    }
    case SessionActionTypes.FETCH_ERROR: {
      return produce(state, (draft: SessionState) => {
        draft.fetchStatus = 'idle';
        draft.error = {
          code: action.payload.code,
          message: errorCodeMessageMap[action.payload.code],
        };
      });
    }
    default: {
      return state;
    }
  }
}

const errorCodeMessageMap: Record<number, string> = {
  401: 'Incorrect password, please try again.',
};
