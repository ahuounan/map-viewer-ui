import clsx from 'clsx';
import isEqual from 'lodash.isequal';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { FilterPills } from '@src/components/FilterPills';
import { BarChart, BarChartItem } from '@src/components/charts/BarChart';
import { useDispatch } from '@src/store/hooks';
import {
  mapActions,
  mapSelectors,
  AreaFilter,
  Filter,
  FilterType,
  MaterialFilter,
} from '@src/store/map';
import { statsSelectors } from '@src/store/stats';
import { RootState } from '@src/store/types';

interface Props {
  type: FilterType;
}

export function RampsBy(props: Props): JSX.Element {
  const { type } = props;
  const dispatch = useDispatch();

  const dataSelector: (
    state: RootState
  ) => BarChartItem<MaterialFilter | AreaFilter>[] | null =
    filterStatsSelectorMap[type];

  const data = useSelector(dataSelector, isEqual);

  const filterSelector = React.useMemo(mapSelectors.makeFilter, []);
  const filters = useSelector<RootState, Filter[]>(state =>
    filterSelector(state, type)
  );

  const handleClick = React.useCallback(
    (filter: Filter) => {
      dispatch(mapActions.toggleFilter(filter));
    },
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <FilterPills filters={filters} onPillClick={handleClick} />
      <div className={styles.chartContainer}>
        <BarChart
          data={data}
          height={300}
          width={425}
          onBarClick={handleClick}
        />
      </div>
    </div>
  );
}

const filterStatsSelectorMap = {
  [FilterType.AREA]: statsSelectors.area,
  [FilterType.MATERIAL]: statsSelectors.material,
};

const styles = {
  container: clsx('relative', 'my-2'),
  chartContainer: clsx('flex', 'justify-center'),
};
