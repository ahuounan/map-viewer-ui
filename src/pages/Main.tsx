import clsx from 'clsx';
import * as React from 'react';

import { FullScreen } from '@components/layouts/FullScreen';
import { Overlay } from '@components/layouts/Overlay';
import { Widget } from '@components/layouts/Widget';
import { BoatRampMap } from '@containers/BoatRampMap';
import { RampsByMaterial } from '@containers/RampsByMaterial';
import { RampsBySize } from '@containers/RampsBySize';

export function Main(): JSX.Element {
  return (
    <FullScreen>
      <BoatRampMap />
      <Overlay>
        <Widget containerClassName={styles.widget} header="Ramps By Material">
          <RampsByMaterial />
        </Widget>
        <Widget containerClassName={styles.widget} header="Ramps By Size">
          <RampsBySize />
        </Widget>
      </Overlay>
    </FullScreen>
  );
}

const styles = {
  widget: clsx(
    'm-2',
    'inline',
    'shadow-sm',
    'rounded',
    'p-2',
    'bg-opacity-80',
    'bg-gray-50'
  ),
};
