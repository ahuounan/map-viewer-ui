import clsx from 'clsx';
import * as React from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface Props {
  children?: React.ReactNode;
  header: string;
  containerClassName?: string;
}

export function Widget(props: Props): JSX.Element {
  const { children, containerClassName, header } = props;
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className={styles.container(containerClassName)}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>{header}</h1>
        <button onClick={() => setCollapsed(cur => !cur)}>
          {collapsed ? <BsChevronDown /> : <BsChevronUp />}
        </button>
      </div>
      <div className={styles.content(collapsed)}>{children}</div>
    </div>
  );
}

const styles = {
  container: (containerClassName?: string) => clsx(containerClassName),
  header: clsx('flex', 'justify-between', 'my-2'),
  headerText: clsx(),
  content: (collapsed: boolean) =>
    clsx(
      'overflow-y-auto',
      'bg-gray-100',
      collapsed ? 'h-0' : 'h-auto',
      collapsed ? 'opacity-0' : 'opacity-100'
    ),
};
