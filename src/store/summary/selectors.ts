import { createDeepEqualSelector } from '@libs/reselect/createDeepEqualSelector';

import { boatRampSelectors } from '../boatRamp';
import { denormalize } from '../boatRamp/transformers';
import { RootState } from '../types';

import { SummaryState } from './types';

const selector = (state: RootState): SummaryState => state.summary;

const visibleIdsSelector = (state: RootState): string[] | null =>
  selector(state)?.visibleIds ?? null;

// Memoized state-only selector
const visibleDataSelector = createDeepEqualSelector(
  visibleIdsSelector,
  boatRampSelectors.entities,
  (ids, entities) =>
    ids === null || entities === null ? null : denormalize(ids, entities)
);

const materialsDataSelector = createDeepEqualSelector(
  visibleDataSelector,
  data =>
    data?.features.reduce((acc: Record<string, number> | null, feat) => {
      if (
        feat.properties.material === null ||
        feat.properties.material === undefined
      ) {
        return acc;
      }
      if (!acc) {
        acc = {};
      }
      if (!acc[feat.properties.material]) {
        acc[feat.properties.material] = 0;
      }
      acc[feat.properties.material]++;
      return acc;
    }, null)
);

export const summarySelectors = {
  state: selector,
  visibleData: visibleDataSelector,
  materialsData: materialsDataSelector,
};
