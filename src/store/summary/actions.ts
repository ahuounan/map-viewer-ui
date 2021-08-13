import { Action, ActionsUnion } from '@libs/redux/action';
import { createAction } from '@libs/redux/createAction';

export enum SummaryActionTypes {
  SET_VISIBLE = '[Summary] SET_VISIBLE',
}

export const summaryActions = {
  setVisible: (
    ids: string[]
  ): Action<SummaryActionTypes.SET_VISIBLE, string[]> =>
    createAction(SummaryActionTypes.SET_VISIBLE, ids),
};

export type SummaryActions = ActionsUnion<typeof summaryActions>;
