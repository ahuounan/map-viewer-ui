export type FetchStatus = 'idle' | 'fetching';

export interface FetchedDataState {
  fetchStatus: FetchStatus;
  error: FetchedDataError | null;
}

export type FetchedDataError = string;

export interface NormalizedData<T> {
  ids: string[];
  entities: Record<string, T>;
}
