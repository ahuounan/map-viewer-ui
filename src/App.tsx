import * as React from 'react';
import { useSelector } from 'react-redux';

import { Login } from '@pages/Login';
import { sessionSelectors } from '@src/store/session';

import { Main } from './pages/Main';

import 'mapbox-gl/dist/mapbox-gl.css';

export function App(): JSX.Element {
  const token = useSelector(sessionSelectors.token);
  return token ? <Main /> : <Login />;
}
