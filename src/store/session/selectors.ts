import { createSelector } from 'reselect';

import { FetchedDataError, FetchStatus } from '@libs/redux/templates/fetched';

import { RootState } from '../types';

import { SessionState } from './types';

const selector = (state: RootState): SessionState => state.session;

const fetchStatusSelector = (state: RootState): FetchStatus | null =>
  selector(state).fetchStatus;

const errorSelector = (state: RootState): FetchedDataError | null =>
  selector(state).error;

const tokenSelector = (state: RootState): string | null =>
  selector(state).token;

const mapTokenSelector = createSelector(tokenSelector, token => {
  if (!token) {
    return null;
  }
  const [, payload] = token.split('.');
  const decoded = window.atob(payload);
  const parsed = JSON.parse(decoded);

  return parsed.mapToken;
});

export const sessionSelectors = {
  state: selector,
  fetchStatus: fetchStatusSelector,
  error: errorSelector,
  token: tokenSelector,
  mapToken: mapTokenSelector,
};
