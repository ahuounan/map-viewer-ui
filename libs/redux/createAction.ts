import { Action, ActionWithoutPayload, ActionWithPayload } from './types';

export function createAction<T extends string>(
  type: T
): ActionWithoutPayload<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(
  type: T,
  payload?: P
): Action<T, P> {
  return payload === undefined ? { type } : { type, payload };
}
