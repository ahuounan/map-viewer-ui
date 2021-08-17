import { Feature } from 'geojson';
import { Point } from 'mapbox-gl';

export type PointLike = Point | number[];

export type MapApi = {
  setFilter: (
    layerId: string,
    filter: MapFilter,
    options?: {
      validate: boolean;
    }
  ) => void;
  getLayer: (id: string) => MapLayer;
  queryRenderedFeatures: (
    geometry?: PointLike | PointLike[],
    options?: {
      filter?: any[];
      layers?: string[];
      validate?: boolean;
    }
  ) => Feature[];
  on: (type: string, layerId: string, listener: () => void) => void;
};

export type MapFilter = (string | number | MapFilter)[] | null;
export type MapLayer = Record<string, any>;
