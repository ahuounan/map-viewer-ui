import { ViewState } from 'react-map-gl/src/mapbox/mapbox';

import { ActionsUnion } from '@libs/redux/action';
import { createAction } from '@libs/redux/createAction';

import { Filter } from './types';

export enum MapActionTypes {
  SET_VISIBLE = '[Map] SET_VISIBLE',
  TOGGLE_FILTER = '[Map] TOGGLE_FILTER',
  SET_VIEWPORT = '[Map] SET_VIEWPORT',
}

export const mapActions = {
  setVisible: (ids: string[]) => createAction(MapActionTypes.SET_VISIBLE, ids),
  toggleFilter: (filter: Filter) =>
    createAction(MapActionTypes.TOGGLE_FILTER, filter),
  setViewport: (viewport: { view: ViewState }) =>
    createAction(MapActionTypes.SET_VIEWPORT, viewport),
};

export type MapActions = ActionsUnion<typeof mapActions>;
