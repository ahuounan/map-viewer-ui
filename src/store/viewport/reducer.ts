import { ViewportActions, ViewportActionTypes } from './actions';
import { ViewportState } from './types';

const initialState: ViewportState = {
  bounds: null,
  view: {
    latitude: -28,
    longitude: 153,
    zoom: 8,
  },
};

export function viewportReducer(
  state: ViewportState = initialState,
  action: ViewportActions
): ViewportState {
  switch (action.type) {
    case ViewportActionTypes.SET: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
