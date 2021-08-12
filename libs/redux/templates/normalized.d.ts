export interface NormalizedDataState<T> {
  ids: string[];
  entities: Record<string, T>;
}
