import { BarChartItem } from '@src/components/charts/BarChart';

import { BoatRampFeature } from '../boatRamp/types';
import { FilterType, AreaFilter, MaterialFilter } from '../map';

export function aggregateByMaterials(
  features: BoatRampFeature[]
): Record<string, number> {
  return features?.reduce((acc: Record<string, number>, feat) => {
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
  }, {});
}

export function materialMapToBarChartItems(
  materialsMap: Record<string, number>
): BarChartItem<MaterialFilter>[] {
  return Object.entries(materialsMap)
    .map(([key, value]) => {
      const metadata: MaterialFilter = {
        type: FilterType.MATERIAL,
        value: key,
        key,
        label: key,
      };

      return {
        key,
        label: key,
        value,
        metadata,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

type AreaMap = Record<
  string,
  {
    label: string;
    filterValue: [number, number];
    value: number;
  }
>;

export function aggregateByArea(features: BoatRampFeature[]): AreaMap {
  return features.reduce(
    (
      acc: Record<
        string,
        {
          label: string;
          filterValue: [number, number];
          value: number;
        }
      >,
      feat
    ) => {
      if (
        feat.properties.area_ === null ||
        feat.properties.area_ === undefined
      ) {
        return acc;
      }

      if (feat.properties.area_ <= 50) {
        if (!acc['0 - 50']) {
          acc['0 - 50'] = {
            label: '0 - 50',
            filterValue: [0, 50],
            value: 0,
          };
        }
        acc['0 - 50'].value++;
      } else if (feat.properties.area_ <= 200) {
        if (!acc['50 - 200']) {
          acc['50 - 200'] = {
            label: '50 - 200',
            filterValue: [50, 200],
            value: 0,
          };
        }
        acc['50 - 200'].value++;
      } else if (feat.properties.area_ <= 526) {
        if (!acc['200 - 526']) {
          acc['200 - 526'] = {
            label: '200 - 526',
            filterValue: [200, 526],
            value: 0,
          };
        }
        acc['200 - 526'].value++;
      }

      return acc;
    },
    {}
  );
}

export function areaMapToBarChartItems(
  areaMap: AreaMap
): BarChartItem<AreaFilter>[] {
  return Object.entries(areaMap)
    .map(([key, { label, filterValue, value }]) => {
      const metadata: AreaFilter = {
        type: FilterType.AREA,
        value: filterValue,
        label,
        key: label,
      };
      return {
        key,
        label,
        value,
        metadata,
      };
    })
    .sort((a, b) => a.metadata.value[0] - b.metadata.value[0]);
}
