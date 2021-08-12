import { FetchedDataState } from '@libs/redux/templates/fetched';

export interface SessionState extends FetchedDataState {
  token: string | null;
}

export type SessionFetchResponse = {
  token: string;
};
