import { Feature, Point } from 'geojson';
import isEqual from 'lodash.isequal';
import React from 'react';
import ReactMapGL, {
  Source,
  Layer,
  MapRef,
  LayerProps,
  SourceProps,
} from 'react-map-gl';
import { ViewState } from 'react-map-gl/src/mapbox/mapbox';
import { useSelector } from 'react-redux';

import { boatRampActions, boatRampSelectors } from '@src/store/boatRamp';
import { useDispatch } from '@src/store/hooks';
import { viewportActions } from '@src/store/viewport';
import { viewportSelectors } from '@src/store/viewport/selectors';

import { Loadable } from '../components/Loadable';

export function BoatRampMap(): JSX.Element {
  const dispatch = useDispatch();
  const data = useSelector(boatRampSelectors.data, isEqual);
  const status = useSelector(boatRampSelectors.fetchStatus);
  const error = useSelector(boatRampSelectors.error);
  const viewPort = useSelector(viewportSelectors.view, isEqual);
  const mapRef = React.useRef<MapRef>(null);

  React.useEffect(() => {
    dispatch(boatRampActions.fetchRequest());
  }, [dispatch]);

  const handleViewStateChange = React.useCallback(
    (event: { viewState: ViewState }) => {
      const { viewState } = event;
      dispatch(
        viewportActions.set({
          view: viewState,
          bounds: mapRef.current?.getMap().getBounds()?.toArray() ?? null,
        })
      );

      if (mapRef.current) {
        const map = mapRef.current.getMap();
        const layer = map.getLayer('boat-ramps');
        if (layer) {
          const ids = mapRef.current
            .getMap()
            .queryRenderedFeatures(undefined, queryBoatRampLayerOptions)
            .map((feature: Feature<Point>) => feature.id);
          dispatch(boatRampActions.setVisible(ids));
        }
      }
    },
    [dispatch]
  );

  return (
    <Loadable loading={status !== 'idle'} error={error} data={data}>
      <ReactMapGL
        key="boat-ramps"
        width="100%"
        height="100%"
        ref={mapRef}
        onViewStateChange={handleViewStateChange}
        {...viewPort}
      >
        {data ? (
          <>
            <Source {...sourceProps} data={data}>
              <Layer {...layerProps} />
            </Source>
          </>
        ) : null}
      </ReactMapGL>
    </Loadable>
  );
}

const queryBoatRampLayerOptions = {
  layers: ['boat-ramps'],
};

const sourceProps: SourceProps = {
  id: 'boat-ramps',
  type: 'geojson',
  promoteId: 'id',
};

const layerProps: LayerProps = {
  id: 'boat-ramps',
  type: 'circle' as const,
  source: 'boat-ramps',
  paint: {
    'circle-radius': 10,
    'circle-stroke-color': '#000000',
    'circle-stroke-width': 1,
  },
};
