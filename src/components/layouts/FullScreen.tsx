import clsx from 'clsx';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export function FullScreen(props: Props): JSX.Element {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
}

const styles = {
  container: clsx('relative', 'h-screen', 'w-screen', 'p-0', 'm-0'),
};
