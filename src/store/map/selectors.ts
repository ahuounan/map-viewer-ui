import { ViewState } from 'react-map-gl/src/mapbox/mapbox';

import { createDeepEqualSelector } from '@libs/reselect/createDeepEqualSelector';

import { boatRampSelectors } from '../boatRamp';
import { RootState } from '../types';

import { filtersToMapFilters } from './transformers';
import { FilterType, isAreaFilter, isMaterialFilter } from './typeguards';
import { Filter, MapState } from './types';

const selector = (state: RootState): MapState => state.map;

const visibleIdsSelector = (state: RootState): string[] | null =>
  selector(state)?.visibleIds ?? null;

const filtersSelector = (state: RootState): Map<string, Filter> | null =>
  selector(state)?.filter;

const mapFiltersSelector = createDeepEqualSelector(filtersSelector, filters => {
  if (filters === null || filters.size === 0) {
    return null;
  }

  return filtersToMapFilters(filters);
});

const filterTypeguardMap = {
  [FilterType.AREA]: isAreaFilter,
  [FilterType.MATERIAL]: isMaterialFilter,
};
const makeFilterSelector = () =>
  createDeepEqualSelector(
    filtersSelector,
    (_: RootState, type: FilterType) => type,
    (filters, type) => {
      const result: Filter[] = [];

      filters?.forEach(f => {
        if (filterTypeguardMap[type](f)) {
          result.push(f);
        }
      });

      return result;
    }
  );

const viewSelector = (state: RootState): ViewState | null =>
  selector(state).viewport.view;

const visibleDataSelector = createDeepEqualSelector(
  visibleIdsSelector,
  boatRampSelectors.entities,
  (ids, entities) =>
    ids !== null && entities !== null ? ids.map(id => entities[id]) : null
);

export const mapSelectors = {
  state: selector,
  visibleIds: visibleIdsSelector,
  visibleData: visibleDataSelector,
  mapFilters: mapFiltersSelector,
  makeFilter: makeFilterSelector,
  filters: filtersSelector,
  view: viewSelector,
};
