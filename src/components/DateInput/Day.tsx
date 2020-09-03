import React from 'react';
import Box from '../Box';
import AbstractButton from '../AbstractButton';
import Cell from './Cell';
import dayjs, { Dayjs } from 'dayjs';
import { noop } from '../../utils/helpers';

export interface DayProps {
  day?: number;
  isLastRow?: boolean;
  month: number;
  year: number;
  daySelected?: Dayjs;
  dayRangeSelected?: [Dayjs?, Dayjs?];
  onDaySelect?: (date: Dayjs) => void;
}

const Day: React.FC<DayProps> = ({
  day,
  month,
  year,
  daySelected,
  isLastRow,
  dayRangeSelected,
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
  const date = React.useMemo(() => dayjs().month(month).date(day).year(year), [year, day, month]);
  const onDaySelectClick = React.useCallback(
    e => {
      e.preventDefault();
      onDaySelect(date);
    },
    [date, onDaySelect]
  );

  const isSelected = React.useMemo(() => {
    if (!daySelected && !dayRangeSelected) {
      return false;
    }
    if (!date) {
      return false;
    }

    if (daySelected) {
      return date.isSame(daySelected, 'date');
    }
    // @ts-ignore
    const [start, end] = dayRangeSelected;
    return (start && date.isSame(start, 'date')) || (end && date.isSame(end, 'date'));
  }, [date, daySelected, dayRangeSelected]);

  const isWithinRange = React.useCallback(() => {
    if (!dayRangeSelected) {
      return false;
    }
    // @ts-ignore
    const [start, end] = dayRangeSelected;
    return start && date.isAfter(start, 'date') && end && date.isBefore(end, 'date');
  }, [date, dayRangeSelected]);

  return (
    <Cell
      display="table-cell"
      verticalAlign="middle"
      textAlign="center"
      cursor="pointer"
      position="relative"
      aria-label={date.format('dd MMM DD YYYY')}
      role="gridcell"
      aria-busy={isWithinRange()}
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
