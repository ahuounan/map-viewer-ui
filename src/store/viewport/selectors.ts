import { ViewState } from 'react-map-gl/src/mapbox/mapbox';

import { Bounds } from '@libs/react-map-gl/types';
import { RootState } from '@store/types';

import { ViewportState } from './types';

const selector = (state: RootState): ViewportState => state.viewport;
const boundsSelector = (state: RootState): Bounds | null =>
  state.viewport.bounds;
const viewSelector = (state: RootState): ViewState | null =>
  state.viewport.view;

export const viewportSelectors = {
  state: selector,
  bounds: boundsSelector,
  view: viewSelector,
};
