import { Identifiable } from '@libs/types/Identifiable';

import { Geometry } from './geometry';

/**
 * Typing of geojson objects based on the spec at
 * https://geojson.org/geojson-spec.html
 */

export interface Feature extends Identifiable {
  type: 'Feature';
  geometry: Geometry;
  properties: Record<string, string | number>;
}

export interface FeatureCollection extends Identifiable {
  type: 'FeatureCollection';
  features: Feature[];
}
