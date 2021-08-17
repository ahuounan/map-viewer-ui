import { MapFilter } from '@libs/mapbox-gl/types';

import { isAreaFilter, isMaterialFilter } from './typeguards';
import { Filter } from './types';

export function getFilterId(filter: Filter): string {
  return `${filter.type}:${filter.key}`;
}

export function filtersToMapFilters(filters: Map<string, Filter>): MapFilter {
  const mapFilters: MapFilter = ['all'];
  const getMaterial = ['get', 'material'];
  const getArea = ['get', 'area_'];
  const materialMapFilters: MapFilter = ['any'];
  const sizeMapFilters: MapFilter = ['any'];
  filters.forEach(filter => {
    if (isMaterialFilter(filter)) {
      materialMapFilters.push(['==', getMaterial, filter.value]);
    }
    if (isAreaFilter(filter)) {
      const [lower, upper] = filter.value;
      sizeMapFilters.push([
        'all',
        ['>=', getArea, lower],
        ['<', getArea, upper],
      ]);
    }
  });
  if (sizeMapFilters.length > 1) {
    mapFilters.push(sizeMapFilters);
  }
  if (materialMapFilters.length > 1) {
    mapFilters.push(materialMapFilters);
  }

  return mapFilters;
}
