import { Feature, Point } from 'geojson';
import { createSelector } from 'reselect';

import { FetchStatus, FetchedDataError } from '@libs/redux/templates/fetched';

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

const visibleIdsSelector = (state: RootState): string[] | null =>
  selector(state)?.visibleIds ?? null;

const entitiesSelector = (
  state: RootState
): Record<string, Feature<Point>> | null => selector(state)?.entities ?? null;

// Memoized state-only selector
const dataSelector = createSelector(
  idsSelector,
  entitiesSelector,
  (ids, entities) =>
    ids === null || entities === null ? null : denormalize(ids, entities)
);
const visibleDataSelector = createSelector(
  visibleIdsSelector,
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
const makeDataByIdsSelector = () =>
  createSelector(
    entitiesSelector,
    (_: RootState, ids: string[]) => ids,
    (entities, ids) => ids.map(id => entities?.[id] ?? null)
  );

export const boatRampSelectors = {
  state: selector,
  fetchStatus: fetchStatusSelector,
  error: errorSelector,
  data: dataSelector,
  visibleData: visibleDataSelector,
  makeDataById: makeDataByIdSelector,
  makeDataByIds: makeDataByIdsSelector,
  entities: entitiesSelector,
};
