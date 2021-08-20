import * as React from 'react';
import { useSelector } from 'react-redux';

import { BarChartItem } from '@src/components/charts/BarChart';
import { useDispatch } from '@src/store/hooks';
import {
  AreaFilter,
  Filter,
  FilterType,
  mapSelectors as _mapSelectors,
  MaterialFilter,
} from '@src/store/map';
import { statsSelectors as _statsSelectors } from '@src/store/stats';
import {
  queryAllByTestId,
  queryByTestId,
  queryByText,
  render,
} from '@testing-library/react';

import { RampsBy } from '../RampsBy';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

const areaSelector = 'area';
const materialSelector = 'material';
const makeFilterSelector = () => 'makeFilter';

jest.mock('@src/store/stats', () => ({
  statsSelectors: {
    AREA: areaSelector,
    MATERIAL: materialSelector,
  },
}));

jest.mock('@src/store/hooks', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('@src/store/map', () => ({
  mapSelectors: {
    makeFilter: makeFilterSelector,
  },
  FilterType: jest.requireActual('@src/store/map'),
}));

function setup(
  data: BarChartItem<AreaFilter | MaterialFilter>[] | null,
  filters: Filter[],
  dispatch: jest.Mock
) {
  (useSelector as jest.Mock).mockImplementation(selector => {
    if (typeof selector === 'function') {
      return filters;
    }
    return data;
  });

  (useDispatch as jest.Mock).mockImplementation(() => dispatch);
}

describe('RampsBy', () => {
  it('should render filter pills', () => {
    const dispatch = jest.fn();
    setup(null, [], dispatch);
    const { container } = render(<RampsBy type={FilterType.AREA} />);
    const filterPills = queryByTestId(container, 'filter-pills');

    expect(filterPills).toBeVisible();
  });

  it('should render a loading placeholder when there is no data', () => {
    const dispatch = jest.fn();
    setup(null, [], dispatch);
    const { container } = render(<RampsBy type={FilterType.MATERIAL} />);

    const loading = queryByText(container as HTMLElement, 'Loading...');
    expect(loading).toBeVisible();
  });

  it('should render a barchart when data is provided', () => {
    const data: BarChartItem<MaterialFilter | AreaFilter>[] = [
      {
        label: 'test1',
        value: 1,
        key: 'test1',
        metadata: {
          type: FilterType.MATERIAL,
          value: 'test1',
          key: 'test1',
          label: 'test1',
        },
      },
      {
        label: 'test2',
        value: 1,
        key: 'test2',
        metadata: {
          type: FilterType.MATERIAL,
          value: 'test2',
          key: 'test2',
          label: 'test2',
        },
      },
      {
        label: 'test3',
        value: 1,
        key: 'test3',
        metadata: {
          type: FilterType.MATERIAL,
          value: 'test3',
          key: 'test3',
          label: 'test3',
        },
      },
    ];
    const dispatch = jest.fn();
    setup(data, [], dispatch);
    const { container } = render(<RampsBy type={FilterType.MATERIAL} />);

    const bars = queryAllByTestId(container, 'barchart-bar');
    expect(bars.length).toBe(data.length);
    for (const bar of bars) {
      expect(bar).toBeVisible();
    }
  });
});
