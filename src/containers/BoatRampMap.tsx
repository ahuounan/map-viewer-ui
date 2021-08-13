import { Feature, Point } from 'geojson';
import isEqual from 'lodash.isequal';
import uniq from 'lodash.uniq';
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
import { sessionActions, sessionSelectors } from '@src/store/session';
import { summaryActions } from '@src/store/summary';
import { viewportActions } from '@src/store/viewport';
import { viewportSelectors } from '@src/store/viewport/selectors';

import { Loadable } from '../components/Loadable';

export function BoatRampMap(): JSX.Element {
  const dispatch = useDispatch();
  const data = useSelector(boatRampSelectors.data, isEqual);
  const status = useSelector(boatRampSelectors.fetchStatus);
  const error = useSelector(boatRampSelectors.error);
  const viewPort = useSelector(viewportSelectors.view, isEqual);
  const token = useSelector(sessionSelectors.token);
  const mapRef = React.useRef<MapRef>(null);

  React.useEffect(() => {
    dispatch(boatRampActions.fetchRequest());
    dispatch(sessionActions.fetchRequest());
  }, [dispatch]);

  const setViewportBounds = React.useCallback(
    (viewState: ViewState) => {
      dispatch(
        viewportActions.set({
          view: viewState,
          bounds: mapRef.current?.getMap().getBounds()?.toArray() ?? null,
        })
      );
    },
    [dispatch]
  );
  const setVisibleIds = React.useCallback(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const layer = map.getLayer('boat-ramps');
      if (layer) {
        const ids: string[] = mapRef.current
          .getMap()
          .queryRenderedFeatures(undefined, queryBoatRampLayerOptions)
          .map((feature: Feature<Point>) => feature.id);
        const uniqIds = uniq(ids);
        dispatch(summaryActions.setVisible(uniqIds));
      }
    }
  }, [dispatch]);

  const handleViewStateChange = React.useCallback(
    (event: { viewState: ViewState }) => {
      const { viewState } = event;
      setViewportBounds(viewState);
      setVisibleIds();
    },
    [setViewportBounds, setVisibleIds]
  );
  const handleLoad = React.useCallback(() => {
    setVisibleIds();
  }, [setVisibleIds]);

  return (
    <Loadable loading={status !== 'idle'} error={error} data={data && token}>
      <ReactMapGL
        key="boat-ramps"
        mapboxApiAccessToken={token ?? undefined}
        ref={mapRef}
        onLoad={handleLoad}
        onViewStateChange={handleViewStateChange}
        {...viewPort}
        width="100%"
        height="100%"
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
