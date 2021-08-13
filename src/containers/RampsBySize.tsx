import clsx from 'clsx';
import isEqual from 'lodash.isequal';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { BarChart } from '@src/components/charts/BarChart';
import { summarySelectors } from '@src/store/summary';

export function RampsBySize(): JSX.Element {
  const size = useSelector(summarySelectors.sizeData, isEqual);

  return (
    <div className={styles.container}>
      <BarChart data={size} height={300} width={400} />
    </div>
  );
}

const styles = {
  container: clsx('relative'),
};
