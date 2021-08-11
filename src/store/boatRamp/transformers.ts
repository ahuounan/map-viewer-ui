import { Feature, FeatureCollection } from 'geojson';
import { v4 } from 'uuid';

import { NormalizedData } from '@libs/redux/types';

import { BoatRampFetchResponse } from './types';

export function normalize(
  input: BoatRampFetchResponse
): NormalizedData<Feature> {
  const result: NormalizedData<Feature> = {
    ids: [],
    entities: {},
  };

  input.features.forEach(feature => {
    const id = String(feature.id) ?? v4();
    result.entities[id] = feature;
    result.ids.push(id);
  });

  return result;
}

export function denormalize(
  ids: string[],
  entities: Record<string, Feature>
): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: ids.map(id => entities[id]),
  };
}
