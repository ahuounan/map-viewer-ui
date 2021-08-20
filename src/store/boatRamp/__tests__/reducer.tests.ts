import { NormalizedDataState } from '@libs/redux/templates/normalized';

import { boatRampActions } from '../actions';
import { boatRampReducer } from '../reducer';
import { normalize as _normalize } from '../transformers';
import {
  BoatRampFeature,
  BoatRampFetchResponse,
  BoatRampState,
} from '../types';

const mockNormalizedData = {
  ids: ['test1'],
  entities: {
    test1: {
      id: 'test1',
    },
  },
} as unknown as NormalizedDataState<BoatRampFeature>;
const mockTestError = { code: 400, message: 'test' };
jest.mock('../transformers', () => ({
  normalize: jest.fn(() => mockNormalizedData),
}));

const states: Record<string, BoatRampState> = {
  initial: {
    fetchStatus: 'idle',
    error: null,
    ids: [],
    entities: {},
  },
  fetching: {
    fetchStatus: 'fetching',
    error: null,
    ids: [],
    entities: {},
  },
  error: {
    fetchStatus: 'idle',
    error: mockTestError,
    ids: [],
    entities: {},
  },
  canceled: {
    fetchStatus: 'idle',
    error: null,
    ids: [],
    entities: {},
  },
  response: {
    fetchStatus: 'idle',
    error: null,
    ...mockNormalizedData,
  },
};

describe('boatRamp reducer', () => {
  it('should set fetchStatus to fetching on a FETCH_REQUEST', () => {
    const stateAfterRequest = boatRampReducer(
      states.initial,
      boatRampActions.fetchRequest()
    );

    expect(stateAfterRequest).toEqual(states.fetching);
  });
  it('should set fetchStatus to idle on a FETCH_CANCELED', () => {
    const stateAfterCanceled = boatRampReducer(
      states.fetching,
      boatRampActions.fetchCanceled()
    );

    expect(stateAfterCanceled).toEqual(states.canceled);
  });
  it('should set fetchStatus to idle and fill in normalized data on a FETCH_RESPONSE', () => {
    const stateAfterResponse = boatRampReducer(
      states.fetching,
      boatRampActions.fetchResponse({} as BoatRampFetchResponse)
    );

    expect(stateAfterResponse).toEqual(states.response);
  });
  it('should set fetchStatus to idle and set error on a FETCH_ERROR', () => {
    const stateAfterError = boatRampReducer(
      states.fetching,
      boatRampActions.fetchError(mockTestError)
    );

    expect(stateAfterError).toEqual(states.error);
  });
});
