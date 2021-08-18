import clsx from 'clsx';
import * as React from 'react';

import { FullScreen } from '@components/layouts/FullScreen';
import { Overlay } from '@components/layouts/Overlay';
import { Widget } from '@components/layouts/Widget';
import { BoatRampMap } from '@containers/BoatRampMap';
import { RampsBy } from '@containers/RampsBy';
import { FilterType } from '@src/store/map';

export function Main(): JSX.Element {
  return (
    <FullScreen>
      <BoatRampMap />
      <Overlay>
        <Widget containerClassName={styles.widget} header="Ramps By Area">
          <RampsBy type={FilterType.AREA} />
        </Widget>
        <Widget containerClassName={styles.widget} header="Ramps By Material">
          <RampsBy type={FilterType.MATERIAL} />
        </Widget>
      </Overlay>
    </FullScreen>
  );
}

const styles = {
  widget: clsx(
    'w-450px',
    'm-2',
    'inline',
    'shadow-sm',
    'rounded',
    'p-2',
    'bg-opacity-80',
    'bg-gray-50'
  ),
};
