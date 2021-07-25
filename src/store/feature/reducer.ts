import produce from 'immer';

import { FeatureActions, FeatureActionTypes } from './actions';
import { normalize } from './transformers';
import { FeatureState as FeatureState } from './types';

const initialState: FeatureState = {
  fetchStatus: 'idle',
  error: null,
  data: null,
};

export function featureReducer(
  state: FeatureState = initialState,
  action: FeatureActions
): FeatureState {
  switch (action.type) {
    case FeatureActionTypes.FETCH_REQUEST: {
      return produce(state, (draft: FeatureState) => {
        draft.fetchStatus = 'fetching';
      });
    }
    case FeatureActionTypes.FETCH_CANCELED: {
      return produce(state, (draft: FeatureState) => {
        draft.fetchStatus = 'idle';
      });
    }
    case FeatureActionTypes.FETCH_RESPONSE: {
      return produce(state, (draft: FeatureState) => {
        draft.fetchStatus = 'idle';
        draft.data = normalize(action.payload);
      });
    }
    default: {
      return state;
    }
  }
}
