import * as React from 'react';
import { Selector, useSelector } from 'react-redux';

export function useMemoizedSelector<
  S extends Record<string, unknown>,
  R extends unknown
>(makeSelector: () => Selector<S, R>): R {
  const selector = React.useMemo(makeSelector, []);
  return useSelector(selector);
}
