import * as React from 'react';

interface Props {
  loading: boolean;
  error: string | null;
  data: unknown;
  children?: JSX.Element;
  Loader?: () => JSX.Element;
}

function DefaultLoader(): JSX.Element {
  return <div>Loading...</div>;
}

export function Loadable(props: Props): JSX.Element {
  const { Loader = DefaultLoader, loading, error, data, children } = props;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data) {
    return <>{children}</>;
  }

  return <Loader />;
}
