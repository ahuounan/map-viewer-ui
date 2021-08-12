import { Action, ActionsUnion } from '@libs/redux/action';
import { createAction } from '@libs/redux/createAction';

import { ViewportState } from './types';

export enum ViewportActionTypes {
  SET = '[Viewport] SET',
}

export const viewportActions = {
  set: (
    viewPort: ViewportState
  ): Action<ViewportActionTypes.SET, ViewportState> =>
    createAction(ViewportActionTypes.SET, viewPort),
};

export type ViewportActions = ActionsUnion<typeof viewportActions>;
