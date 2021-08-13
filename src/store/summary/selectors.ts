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
  data => {
    const materialsMap = data?.features.reduce(
      (acc: Record<string, number>, feat) => {
        if (
          feat.properties.material === null ||
          feat.properties.material === undefined
        ) {
          return acc;
        }
        if (!acc[feat.properties.material]) {
          acc[feat.properties.material] = 0;
        }
        acc[feat.properties.material]++;
        return acc;
      },
      {}
    );

    if (!materialsMap) {
      return null;
    }

    return Object.entries(materialsMap)
      .map(([key, value]) => ({
        key,
        label: key,
        value,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }
);

const sizeDataSelector = createDeepEqualSelector(visibleDataSelector, data => {
  const sizeMap = data?.features.reduce((acc: Record<string, number>, feat) => {
    if (feat.properties.area_ === null || feat.properties.area_ === undefined) {
      return acc;
    }

    if (feat.properties.area_ <= 50) {
      if (!acc['0 - 50']) {
        acc['0 - 50'] = 0;
      }
      acc['0 - 50']++;
    } else if (feat.properties.area_ <= 200) {
      if (!acc['50 - 200']) {
        acc['50 - 200'] = 0;
      }
      acc['50 - 200']++;
    } else if (feat.properties.area_ <= 526) {
      if (!acc['200 - 526']) {
        acc['200 - 526'] = 0;
      }
      acc['200 - 526']++;
    }

    return acc;
  }, {});

  if (!sizeMap) {
    return null;
  }

  return Object.entries(sizeMap)
    .map(([key, value]) => ({
      key,
      label: key,
      value,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
});

export const summarySelectors = {
  state: selector,
  visibleData: visibleDataSelector,
  materialsData: materialsDataSelector,
  sizeData: sizeDataSelector,
};
