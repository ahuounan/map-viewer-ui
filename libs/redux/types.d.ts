export interface ActionWithoutPayload<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P>
  extends ActionWithoutPayload<T> {
  payload: P;
}

export type Action<T extends string, P> =
  | ActionWithoutPayload<T>
  | ActionWithPayload<T, P>;

export type ActionMap = Record<string, (...params: any[]) => any>;

export type ActionsUnion<A extends ActionMap> = ReturnType<A[keyof A]>;
