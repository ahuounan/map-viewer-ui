import produce from 'immer';

import { MapActions, MapActionTypes } from './actions';
import { getFilterId } from './transformers';
import { MapState } from './types';

const initialState: MapState = {
  visibleIds: null,
  filter: new Map(),
  viewport: {
    view: {
      latitude: -27.95,
      longitude: 153.25,
      zoom: 10,
    },
  },
};

export function mapReducer(
  state: MapState = initialState,
  action: MapActions
): MapState {
  switch (action.type) {
    case MapActionTypes.SET_VISIBLE: {
      return produce(state, (draft: MapState) => {
        draft.visibleIds = action.payload;
      });
    }
    case MapActionTypes.SET_VIEWPORT: {
      return produce(state, (draft: MapState) => {
        draft.viewport = action.payload;
      });
    }
    case MapActionTypes.TOGGLE_FILTER: {
      return produce(state, (draft: MapState) => {
        const { value } = action.payload;

        const id = getFilterId(action.payload);
        if (value === null) {
          draft.filter.delete(id);
        } else if (draft.filter.has(id)) {
          draft.filter.delete(id);
        } else {
          draft.filter.set(id, action.payload);
        }
      });
    }
    default: {
      return state;
    }
  }
}
