import clsx from 'clsx';
import React from 'react';

import { AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { Text } from '@visx/text';

export type Props<M> = {
  width: number;
  height: number;
  data: BarChartItem<M>[] | null;
  onBarClick?: (metadata: M) => void;
};

export type BarChartItem<M> = {
  label: string;
  value: number;
  key: string;
  metadata: M;
};

export function BarChart<M>(props: Props<M>): JSX.Element | null {
  const { onBarClick, width, height, data } = props;
  const topMargin = 25;
  const axisHeight = 60;
  const xMax = width;
  const yMax = height - topMargin - axisHeight;

  const xScale = React.useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data?.map(getKey) ?? [],
        padding: 0.4,
      }),
    [xMax, data]
  );
  const yScale = React.useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...(data?.map(getValue) ?? [0]))],
      }),
    [yMax, data]
  );

  const xBandWidth = xScale.bandwidth();
  const tickLabelProps = React.useCallback(
    () => ({
      fontSize: 11,
      textAnchor: 'middle' as const,
      verticalAnchor: 'start' as const,
      width: xBandWidth,
    }),
    [xBandWidth]
  );

  return !data ? (
    <Placeholder width={width} height={height} />
  ) : (
    <svg
      data-testid="barchart"
      width={width}
      height={height}
      className={styles.container}
    >
      <Group top={topMargin}>
        {data.map(d => {
          const key = getKey(d);
          const barWidth = xBandWidth;
          const barHeight = yMax - (yScale(getValue(d)) ?? 0);
          const barX = xScale(key);
          const barY = yMax - barHeight;
          return (
            <React.Fragment key={`bar-${key}`}>
              <Bar
                data-testid="barchart-bar"
                tabIndex={0}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                className={styles.bar}
                onClick={onBarClick ? () => onBarClick(d.metadata) : undefined}
                onKeyUp={
                  onBarClick
                    ? e =>
                        e.code === 'Space' ||
                        (e.code === 'Enter' && onBarClick(d.metadata))
                    : undefined
                }
              />
              <Text
                x={(barX ?? 0) + barWidth / 2}
                y={barY}
                fontSize={11}
                textAnchor="middle"
                verticalAnchor="end"
                dy={-5}
                width={barWidth}
              >
                {getValue(d)}
              </Text>
            </React.Fragment>
          );
        })}
      </Group>
      <AxisBottom
        top={yMax + topMargin}
        scale={xScale}
        hideAxisLine
        hideTicks
        tickLabelProps={tickLabelProps}
      />
    </svg>
  );
}

const getKey = (item: BarChartItem<unknown>) => item.key;
const getValue = (item: BarChartItem<unknown>) => item.value;

const styles = {
  container: clsx('bg-gray-100'),
  bar: clsx('cursor-pointer'),
};

interface PlaceholderProps {
  width: number;
  height: number;
}

function Placeholder(props: PlaceholderProps): JSX.Element {
  const { width, height } = props;
  return (
    <div style={{ width, height }} className={placeholderStyles.container}>
      Loading...
    </div>
  );
}

const placeholderStyles = {
  container: clsx('flex', 'justify-center', 'items-center', 'bg-gray-100'),
};
