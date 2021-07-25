import { Feature, FeatureCollection } from '@libs/geojson/feature';
import { FetchedDataState } from '@libs/redux/types';

export type FeatureState = FetchedDataState<Feature>;

export type FeatureFetchResponse = FeatureCollection;
