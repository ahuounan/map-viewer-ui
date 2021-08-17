import { MultiPolygon, Point } from 'geojson';
import flatten from 'lodash.flatten';
import { v4 } from 'uuid';

import { NormalizedDataState } from '@libs/redux/templates/normalized';
import centerOfMass from '@turf/center-of-mass';
import { polygon } from '@turf/helpers';

import { BoatRampFeature, BoatRampFetchResponse } from './types';

export function normalize(
  input: BoatRampFetchResponse
): NormalizedDataState<BoatRampFeature> {
  const result: NormalizedDataState<BoatRampFeature> = {
    ids: [],
    entities: {},
  };

  input.features.forEach(feature => {
    const id = String(feature.id) ?? v4();
    result.entities[id] = {
      ...feature,
      id,
      geometry: convertMultiPolygonToPoint(feature.geometry),
      properties: {
        ...feature.properties,
        id,
      },
    };
    result.ids.push(id);
  });

  return result;
}

export function denormalize(
  ids: string[] | Set<string>,
  entities: Record<string, BoatRampFeature>
): BoatRampFeature[] {
  const data: BoatRampFeature[] = [];
  ids.forEach(id => data.push(entities[id]));

  return data;
}

function convertMultiPolygonToPoint(multiPolygon: MultiPolygon): Point {
  const coordinates = flatten(multiPolygon.coordinates);
  const turfPolygon = polygon(coordinates);
  return centerOfMass(turfPolygon).geometry;
}
