export type FetchStatus = 'idle' | 'fetching';

export interface FetchedDataState<D> {
  fetchStatus: FetchStatus;
  error: FetchedDataError | null;
  data: FetchedDataNormalized<D> | null;
}

export interface FetchedDataNormalized<T> {
  ids: string[];
  entities: FetchedDataEntities<T>;
}

export type FetchedDataEntities<T> = Record<string, T>;

export type FetchedDataError = string;
