import clsx from 'clsx';
import * as React from 'react';

interface Props {
  children?: React.ReactNode;
}

export function Overlay(props: Props): JSX.Element {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
}

const styles = {
  container: clsx(
    'z-10',
    'absolute',
    'top-0',
    'left-0',
    'flex',
    'flex-col',
    'flex-wrap',
    'content-start'
  ),
};
