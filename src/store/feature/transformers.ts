import { Feature } from '@libs/geojson/feature';
import { FetchedDataEntities, FetchedDataNormalized } from '@libs/redux/types';

import { FeatureFetchResponse } from './types';

export function normalize(
  input: FeatureFetchResponse
): FetchedDataNormalized<Feature> {
  const result: FetchedDataNormalized<Feature> = {
    ids: [],
    entities: {},
  };

  input.features.forEach(feature => {
    result.entities[feature.id] = feature;
    result.ids.push(feature.id);
  });

  return result;
}

export function denormalize(
  ids: string[],
  entities: FetchedDataEntities<Feature>
): Feature[] {
  return ids.map(id => entities[id]);
}
