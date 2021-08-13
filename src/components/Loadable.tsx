import clsx from 'clsx';
import * as React from 'react';

interface Props {
  loading: boolean;
  error: string | null;
  data: unknown;
  children?: JSX.Element;
  Loader?: () => JSX.Element;
}

function DefaultLoader(): JSX.Element {
  return <div className={styles.container}>Loading...</div>;
}

const styles = {
  container: clsx(
    'inset-0',
    'flex',
    'justify-center',
    'items-center',
    'absolute',
    'bg-gray-100'
  ),
};

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
