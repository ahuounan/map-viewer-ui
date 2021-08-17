import { FetchStatus, FetchedDataError } from '@libs/redux/templates/fetched';
import { createDeepEqualSelector } from '@libs/reselect/createDeepEqualSelector';

import { RootState } from '../types';

import { denormalize } from './transformers';
import { BoatRampFeature, BoatRampState } from './types';

const selector = (state: RootState): BoatRampState => state.boatRamp;

const fetchStatusSelector = (state: RootState): FetchStatus | null =>
  selector(state).fetchStatus;

const errorSelector = (state: RootState): FetchedDataError | null =>
  selector(state).error;

const idsSelector = (state: RootState): string[] | null =>
  selector(state)?.ids ?? null;

const entitiesSelector = (
  state: RootState
): Record<string, BoatRampFeature> | null => selector(state)?.entities ?? null;

// Memoized state-only selector
const dataSelector = createDeepEqualSelector(
  idsSelector,
  entitiesSelector,
  (ids, entities) =>
    ids === null || entities === null
      ? null
      : {
          type: 'FeatureCollection' as const,
          features: denormalize(ids, entities),
        }
);

// Memoized state and props selector
const makeDataByIdSelector = () =>
  createDeepEqualSelector(
    entitiesSelector,
    (_: RootState, id: string) => id,
    (entities, id) => entities?.[id] ?? null
  );
const makeDataByIdsSelector = () =>
  createDeepEqualSelector(
    entitiesSelector,
    (_: RootState, ids: string[]) => ids,
    (entities, ids) => ids.map(id => entities?.[id] ?? null)
  );

export const boatRampSelectors = {
  state: selector,
  fetchStatus: fetchStatusSelector,
  error: errorSelector,
  data: dataSelector,
  makeDataById: makeDataByIdSelector,
  makeDataByIds: makeDataByIdsSelector,
  entities: entitiesSelector,
};
