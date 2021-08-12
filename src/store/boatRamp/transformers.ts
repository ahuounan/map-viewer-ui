import { Feature, FeatureCollection, MultiPolygon, Point } from 'geojson';
import flatten from 'lodash.flatten';
import { v4 } from 'uuid';

import { NormalizedDataState } from '@libs/redux/templates/normalized';
import * as turf from '@turf/turf';

import { BoatRampFetchResponse } from './types';

export function normalize(
  input: BoatRampFetchResponse
): NormalizedDataState<Feature<Point>> {
  const result: NormalizedDataState<Feature<Point>> = {
    ids: [],
    entities: {},
  };

  input.features.forEach(feature => {
    const id = String(feature.id) ?? v4();
    result.entities[id] = {
      ...feature,
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
  ids: string[],
  entities: Record<string, Feature<Point>>
): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: ids.map(id => entities[id]),
  };
}

function convertMultiPolygonToPoint(multiPolygon: MultiPolygon): Point {
  const coordinates = flatten(multiPolygon.coordinates);
  const turfPolygon = turf.polygon(coordinates);
  return turf.centerOfMass(turfPolygon).geometry;
}
