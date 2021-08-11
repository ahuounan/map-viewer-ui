import { Feature } from 'geojson';
import { createSelector } from 'reselect';

import { FetchStatus, FetchedDataError } from '@libs/redux/types';

import { RootState } from '../types';

import { denormalize } from './transformers';
import { BoatRampState } from './types';

const selector = (state: RootState): BoatRampState => state.boatRamp;

const fetchStatusSelector = (state: RootState): FetchStatus | null =>
  selector(state).fetchStatus;

const errorSelector = (state: RootState): FetchedDataError | null =>
  selector(state).error;

const idsSelector = (state: RootState): string[] | null =>
  selector(state)?.ids ?? null;

const entitiesSelector = (state: RootState): Record<string, Feature> | null =>
  selector(state)?.entities ?? null;

// Memoized state-only selector
const dataSelector = createSelector(
  idsSelector,
  entitiesSelector,
  (ids, entities) =>
    ids === null || entities === null ? null : denormalize(ids, entities)
);

// Memoized state and props selector
const makeDataByIdSelector = () =>
  createSelector(
    entitiesSelector,
    (_: RootState, id: string) => id,
    (entities, id) => entities?.[id] ?? null
  );

export const boatRampSelectors = {
  state: selector,
  fetchStatus: fetchStatusSelector,
  error: errorSelector,
  data: dataSelector,
  dataById: makeDataByIdSelector,
  entities: entitiesSelector,
};
