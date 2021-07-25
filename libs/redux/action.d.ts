export interface ActionWithoutPayload<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P>
  extends ActionWithoutPayload<T> {
  payload: P;
}

export type Action<
  T extends string,
  P extends unknown = undefined
> = P extends undefined ? ActionWithoutPayload<T> : ActionWithPayload<T, P>;

export type ActionMap = Record<string, (...params: any[]) => unknown>;

export type ActionsUnion<A extends ActionMap> = ReturnType<A[keyof A]>;
