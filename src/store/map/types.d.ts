import { ViewState } from 'react-map-gl/src/mapbox/mapbox';

import { FilterType } from './typeguards';

export interface MapState {
  visibleIds: string[] | null;
  filter: Map<string, Filter>;
  viewport: {
    view: ViewState;
  };
}

export type Filter = AreaFilter | MaterialFilter;

export interface AreaFilter extends BaseFilter {
  type: FilterType.AREA;
  value: [number, number];
}

export interface MaterialFilter extends BaseFilter {
  type: FilterType.MATERIAL;
  value: string;
}

interface BaseFilter {
  key: string;
  label: string;
}
