import * as React from 'react';

import { FullScreen } from '@components/layouts/FullScreen';
import { BoatRampMap } from '@containers/BoatRampMap';

export function Main(): JSX.Element {
  return (
    <FullScreen>
      <BoatRampMap />
    </FullScreen>
  );
}
