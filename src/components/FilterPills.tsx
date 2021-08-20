import clsx from 'clsx';
import * as React from 'react';
import { BsXCircle } from 'react-icons/bs';

import { Filter } from '@src/store/map/types';

interface Props {
  filters: Filter[];
  onPillClick: (filter: Filter) => void;
}

export function FilterPills(props: Props): JSX.Element {
  const { filters, onPillClick } = props;

  return (
    <div data-testid="filter-pills" className={styles.container}>
      {filters.length ? (
        filters.map(filter => (
          <FilterPill key={filter.key} onClick={onPillClick} filter={filter} />
        ))
      ) : (
        <div className={styles.placeholder}>No filters</div>
      )}
    </div>
  );
}

interface PillProps {
  filter: Filter;
  onClick: (filter: Filter) => void;
}

function FilterPill(props: PillProps) {
  const { filter, onClick } = props;
  const handleClick = React.useCallback(
    () => onClick(filter),
    [filter, onClick]
  );
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onMouseEnter={React.useCallback(() => setHovered(true), [setHovered])}
      onMouseLeave={React.useCallback(() => setHovered(false), [setHovered])}
      className={styles.pill}
      onClick={handleClick}
    >
      {filter.label}
      {hovered && (
        <span className={styles.closePill}>
          <BsXCircle />
        </span>
      )}
    </button>
  );
}

const styles = {
  container: clsx('flex', 'flex-wrap', 'max-w-full', '-ml-1'),
  placeholder: clsx(
    'px-1',
    'mx-1',
    'my-1',
    'text-gray-500',
    'italic',
    'text-sm'
  ),
  pill: clsx(
    'px-1',
    'mx-1',
    'my-1',
    'rounded',
    'shadow-sm',
    'bg-gray-200',
    'text-gray-700',
    'cursor-pointer',
    'relative',
    'text-sm'
  ),
  closePill: clsx(
    'absolute',
    'inset-0',
    'flex',
    'justify-center',
    'items-center',
    'bg-gray-200'
  ),
};
