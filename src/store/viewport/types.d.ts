import { ViewState } from 'react-map-gl/src/mapbox/mapbox';

import { Bounds } from '@libs/react-map-gl/types';

export interface ViewportState {
  bounds: Bounds | null;
  view: ViewState;
}
