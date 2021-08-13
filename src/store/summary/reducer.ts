import produce from 'immer';

import { SummaryActions, SummaryActionTypes } from './actions';
import { SummaryState } from './types';

const initialState: SummaryState = {
  visibleIds: [],
};

export function summaryReducer(
  state: SummaryState = initialState,
  action: SummaryActions
): SummaryState {
  switch (action.type) {
    case SummaryActionTypes.SET_VISIBLE: {
      return produce(state, (draft: SummaryState) => {
        draft.visibleIds = action.payload;
      });
    }
    default: {
      return state;
    }
  }
}
