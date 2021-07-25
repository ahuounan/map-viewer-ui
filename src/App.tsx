import * as React from 'react';
import { useSelector } from 'react-redux';

import { Loadable } from '@components/Loadable';
import { compareIdentifiableArray } from '@libs/compare';
import { featureActions } from '@store/feature';
import { featureSelectors } from '@store/feature/selectors';
import { useDispatch } from '@store/hooks';

export function App(): JSX.Element {
  return <FeatureList />;
}

function FeatureList() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(featureActions.fetchRequest());
  }, []);

  const data = useSelector(featureSelectors.data, compareIdentifiableArray);
  const status = useSelector(featureSelectors.fetchStatus);
  const error = useSelector(featureSelectors.error);

  return (
    <div className="text-lg">
      <Loadable loading={status !== 'idle'} error={error} data={data}>
        <div>
          {data?.map(feature => (
            <div key={feature.id}>{feature.id}</div>
          ))}
        </div>
      </Loadable>
    </div>
  );
}
