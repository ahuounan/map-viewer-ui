import { Feature } from 'geojson';
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

import { MapApi } from '@libs/mapbox-gl/types';
import { boatRampActions, boatRampSelectors } from '@src/store/boatRamp';
import { useDispatch } from '@src/store/hooks';
import { mapActions, mapSelectors } from '@src/store/map';
import { sessionSelectors } from '@src/store/session';

import { Loadable } from '../components/Loadable';

export function BoatRampMap(): JSX.Element {
  const dispatch = useDispatch();
  const mapRef = React.useRef<MapRef>(null);

  const token = useSelector(sessionSelectors.mapToken);

  const status = useSelector(boatRampSelectors.fetchStatus);
  const error = useSelector(boatRampSelectors.error);
  const data = useSelector(boatRampSelectors.data, isEqual);

  const visibleIds = useSelector(mapSelectors.visibleIds);
  const viewPort = useSelector(mapSelectors.view, isEqual);
  const mapFilters = useSelector(mapSelectors.mapFilters, isEqual);

  const setViewportBounds = React.useCallback(
    (viewState: ViewState) => {
      dispatch(
        mapActions.setViewport({
          view: viewState,
        })
      );
    },
    [dispatch]
  );
  const setVisibleIds = React.useCallback(() => {
    const { mapApi, boatRampLayer } = getMapApiLayer(mapRef);
    if (boatRampLayer) {
      const ids: string[] = mapApi
        .queryRenderedFeatures(undefined, queryBoatRampLayerOptions)
        .filter(feature => feature.id)
        .map((feature: Feature) => String(feature.id));
      if (!isEqual(ids, visibleIds)) {
        dispatch(mapActions.setVisible(ids));
      }
    }
  }, [dispatch, visibleIds]);

  const handleSourceDataChange = React.useCallback(() => {
    setVisibleIds();
  }, [setVisibleIds]);

  const handleViewStateChange = React.useCallback(
    (event: { viewState: ViewState }) => {
      const { viewState } = event;
      setVisibleIds();
      setViewportBounds(viewState);
    },
    [setViewportBounds, setVisibleIds]
  );

  const handleLoad = React.useCallback(() => {
    setVisibleIds();
    const { mapApi } = getMapApiLayer(mapRef);
    if (mapApi) {
      mapApi.on('sourcedata', boatRampLayerId, handleSourceDataChange);
    }
  }, [setVisibleIds, handleSourceDataChange]);

  React.useEffect(() => {
    dispatch(boatRampActions.fetchRequest());
  }, [dispatch]);

  React.useEffect(() => {
    const { mapApi, boatRampLayer } = getMapApiLayer(mapRef);
    if (mapApi && boatRampLayer) {
      mapRef.current?.getMap().setFilter(boatRampLayerId, mapFilters);
    }
  }, [mapFilters]);

  return (
    <Loadable loading={status !== 'idle'} error={error} data={data && token}>
      <ReactMapGL
        key={boatRampLayerId}
        mapboxApiAccessToken={token ?? undefined}
        ref={mapRef}
        onLoad={handleLoad}
        onViewStateChange={handleViewStateChange}
        {...viewPort}
        width="100%"
        height="100%"
      >
        {data && (
          <Source {...sourceProps} data={data}>
            <Layer {...layerProps} />
          </Source>
        )}
      </ReactMapGL>
    </Loadable>
  );
}

const boatRampLayerId = 'boat-ramps';

function getMapApiLayer(mapRef: React.RefObject<MapRef>) {
  const mapApi: MapApi = mapRef.current?.getMap();
  const boatRampLayer = mapApi?.getLayer(boatRampLayerId);

  return { mapApi, boatRampLayer };
}

const queryBoatRampLayerOptions = {
  layers: [boatRampLayerId],
};

const sourceProps: SourceProps = {
  id: boatRampLayerId,
  type: 'geojson',
  promoteId: 'id',
};

const layerProps: LayerProps = {
  id: boatRampLayerId,
  type: 'circle' as const,
  source: boatRampLayerId,
  paint: {
    'circle-radius': 10,
    'circle-stroke-color': '#000000',
    'circle-opacity': 0.6,
    'circle-stroke-width': 1,
  },
};
