import { Filter, AreaFilter, MaterialFilter } from './types';

export function isAreaFilter(filter: Filter): filter is AreaFilter {
  return filter.type === FilterType.AREA;
}

export function isMaterialFilter(filter: Filter): filter is MaterialFilter {
  return filter.type === FilterType.MATERIAL;
}

export enum FilterType {
  MATERIAL = 'MATERIAL',
  AREA = 'AREA',
}
