import { ActionWithoutPayload, ActionWithPayload } from './action';

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
): ActionWithoutPayload<T> | ActionWithPayload<T, P> {
  if (payload === undefined) {
    return { type };
  }
  return { type, payload };
}
