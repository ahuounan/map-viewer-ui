import clsx from 'clsx';
import isEqual from 'lodash.isequal';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { BarChart } from '@src/components/charts/BarChart';
import { summarySelectors } from '@src/store/summary';

export function RampsByMaterial(): JSX.Element {
  const materials = useSelector(summarySelectors.materialsData, isEqual);

  return (
    <div className={styles.container}>
      <BarChart data={materials} height={300} width={400} />
    </div>
  );
}

const styles = {
  container: clsx('relative', 'my-2'),
};
