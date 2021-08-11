import * as React from 'react';
import { useSelector } from 'react-redux';

import { Loadable } from '@components/Loadable';
import { FullScreen } from '@layouts/FullScreen';
import { boatRampActions, boatRampSelectors } from '@src/store/boatRamp';
import { useDispatch } from '@store/hooks';

import { Map } from './components/Map';

import 'mapbox-gl/dist/mapbox-gl.css';

export function App(): JSX.Element {
  return <FeatureList />;
}

function FeatureList() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(boatRampActions.fetchRequest());
  }, []);

  const data = useSelector(boatRampSelectors.data);
  const status = useSelector(boatRampSelectors.fetchStatus);
  const error = useSelector(boatRampSelectors.error);

  return (
    <FullScreen>
      <Loadable loading={status !== 'idle'} error={error} data={data}>
        <Map data={data} />
      </Loadable>
    </FullScreen>
  );
}
