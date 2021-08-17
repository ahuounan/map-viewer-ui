import { createDeepEqualSelector } from '@libs/reselect/createDeepEqualSelector';
import { BarChartItem } from '@src/components/charts/BarChart';
import { mapSelectors } from '@src/store/map';

import { AreaFilter, MaterialFilter } from '../map/types';

import {
  aggregateByArea,
  aggregateByMaterials,
  areaMapToBarChartItems,
  materialMapToBarChartItems,
} from './transformers';

const materialSelector = createDeepEqualSelector(
  mapSelectors.visibleData,
  (features): BarChartItem<MaterialFilter>[] | null => {
    if (!features) {
      return null;
    }

    const materialsMap = aggregateByMaterials(features);

    if (!materialsMap) {
      return null;
    }

    return materialMapToBarChartItems(materialsMap);
  }
);

const areaSelector = createDeepEqualSelector(
  mapSelectors.visibleData,
  (features): BarChartItem<AreaFilter>[] | null => {
    if (!features) {
      return null;
    }

    const areaMap = aggregateByArea(features);

    if (!areaMap) {
      return null;
    }

    return areaMapToBarChartItems(areaMap);
  }
);

export const statsSelectors = {
  material: materialSelector,
  area: areaSelector,
};
