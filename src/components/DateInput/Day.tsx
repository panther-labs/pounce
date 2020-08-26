import React from 'react';
import Box, { BoxProps } from '../Box';
import dayjs, { Dayjs } from 'dayjs';
import { noop } from '../../utils/helpers';

export interface DayProps {
  day?: number;
  month: number;
  year: number;
  daySelected?: Dayjs;
  onDaySelect?: (date: Dayjs) => void;
}

const Cell: React.FC<BoxProps> = props => (
  <Box
    display="table-cell"
    padding={2}
    textAlign="center"
    borderRadius="circle"
    cursor="pointer"
    verticalAlign="middle"
    _selected={{ backgroundColor: 'blue-400' }}
    _hover={{ backgroundColor: 'blue-300' }}
    {...props}
  />
);

const MemoCell = React.memo(Cell);

const Day: React.FC<DayProps> = ({ day, month, year, daySelected, onDaySelect = noop }) => {
  if (!day) {
    return <MemoCell aria-disabled="true" />;
  }
  const date = React.useMemo(() => dayjs().month(month).date(day).year(year), [year, day, month]);
  const onDaySelectClick = React.useCallback(
    e => {
      e.preventDefault();
      onDaySelect(date);
    },
    [date, onDaySelect]
  );

  const isSelected = React.useCallback(() => {
    if (!daySelected || !date) {
      return false;
    }

    return date.isSame(daySelected, 'date');
  }, [date, daySelected]);

  return (
    <MemoCell
      role="gridcell"
      aria-disabled="false"
      aria-selected={isSelected()}
      aria-label={date.format('dd MMM DD YYYY')}
      onClick={onDaySelectClick}
    >
      {day}
    </MemoCell>
  );
};

export default React.memo(Day);
