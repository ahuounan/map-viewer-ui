import { Feature, FeatureCollection } from 'geojson';

import { FetchedDataState, NormalizedData } from '@libs/redux/types';

export interface BoatRampState
  extends FetchedDataState,
    NormalizedData<Feature> {}

export type BoatRampFetchResponse = FeatureCollection;
