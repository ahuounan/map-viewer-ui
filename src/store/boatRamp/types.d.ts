import { Feature, FeatureCollection, MultiPolygon, Point } from 'geojson';

import { FetchedDataState } from '@libs/redux/templates/fetched';
import { NormalizedDataState } from '@libs/redux/templates/normalized';

export interface BoatRampState
  extends FetchedDataState,
    NormalizedDataState<Feature<Point>> {
  visibleIds: string[];
}

export type BoatRampFetchResponse = FeatureCollection<MultiPolygon>;
