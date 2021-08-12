import { RootState } from '../types';

import { SessionState } from './types';

const selector = (state: RootState): SessionState => state.session;

const tokenSelector = (state: RootState): string | null =>
  selector(state).token;

export const sessionSelectors = {
  state: selector,
  token: tokenSelector,
};
