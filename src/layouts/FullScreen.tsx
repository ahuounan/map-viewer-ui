import React from 'react';

interface Props {
  children?: React.ReactNode;
}

export function FullScreen(props: Props): JSX.Element {
  const { children } = props;

  return <div className="relative h-screen w-screen">{children}</div>;
}
