import React from 'react';
import Box from 'components/Box';
import AbstractButton from 'components/AbstractButton';
import Cell from './Cell';
import { Dayjs } from 'dayjs';
import { noop, now } from 'utils/helpers';

export interface DayProps {
  day?: number;
  isLastRow?: boolean;
  month: number;
  year: number;
  daysSelected?: [Dayjs?, Dayjs?];
  timezone: 'local' | 'utc';
  onDaySelect?: (date: Dayjs) => void;
}

const Day: React.FC<DayProps> = ({
  day,
  month,
  year,
  isLastRow,
  daysSelected,
  timezone = 'local',
  onDaySelect = noop,
}) => {
  if (!day) {
    return isLastRow ? null : (
      <Cell
        display="table-cell"
        verticalAlign="middle"
        textAlign="center"
        cursor="pointer"
        position="relative"
        aria-disabled="true"
      />
    );
  }

  const date = React.useMemo(() => {
    return now(timezone).month(month).date(day).year(year);
  }, [year, day, month]);

  const onDaySelectClick = React.useCallback(
    e => {
      e.preventDefault();
      onDaySelect(date);
    },
    [date, onDaySelect]
  );

  const isSelected = React.useMemo(() => {
    if (!daysSelected) {
      return false;
    }
    if (!date) {
      return false;
    }
    const [start, end] = daysSelected;
    return !!((start && date.isSame(start, 'date')) || (end && date.isSame(end, 'date')));
  }, [date, daysSelected]);

  const isWithinRange = React.useMemo(() => {
    if (!daysSelected) {
      return false;
    }
    const [start, end] = daysSelected;
    return !!(start && end && date.isAfter(start, 'date') && date.isBefore(end, 'date'));
  }, [date, daysSelected]);

  return (
    <Cell
      display="table-cell"
      verticalAlign="middle"
      textAlign="center"
      cursor="pointer"
      position="relative"
      aria-label={date.format('dd MMM DD YYYY')}
      role="gridcell"
      aria-busy={isWithinRange}
      aria-selected={isSelected}
    >
      <Box aria-placeholder="true" tabIndex={-1} pointerEvents="none" />
      <AbstractButton
        padding={2}
        borderRadius="circle"
        position="relative"
        zIndex={2}
        onClick={onDaySelectClick}
        // @ts-ignore
        aria-relevant
        width="37px"
        height="37px"
      >
        {day}
      </AbstractButton>
    </Cell>
  );
};

export default React.memo(Day);
