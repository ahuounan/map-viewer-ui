import produce from 'immer';

import { BoatRampActions, BoatRampActionTypes } from './actions';
import { normalize } from './transformers';
import { BoatRampState } from './types';

const initialState: BoatRampState = {
  fetchStatus: 'idle',
  error: null,
  ids: [],
  entities: {},
};

export function boatRampReducer(
  state: BoatRampState = initialState,
  action: BoatRampActions
): BoatRampState {
  switch (action.type) {
    case BoatRampActionTypes.FETCH_REQUEST: {
      return produce(state, (draft: BoatRampState) => {
        draft.fetchStatus = 'fetching';
      });
    }
    case BoatRampActionTypes.FETCH_CANCELED: {
      return produce(state, (draft: BoatRampState) => {
        draft.fetchStatus = 'idle';
      });
    }
    case BoatRampActionTypes.FETCH_RESPONSE: {
      return produce(state, (draft: BoatRampState) => {
        const { ids, entities } = normalize(action.payload);
        draft.fetchStatus = 'idle';
        draft.ids = ids;
        draft.entities = entities;
      });
    }
    case BoatRampActionTypes.FETCH_ERROR: {
      return produce(state, (draft: BoatRampState) => {
        draft.fetchStatus = 'idle';
        draft.error = action.payload;
      });
    }
    default: {
      return state;
    }
  }
}
