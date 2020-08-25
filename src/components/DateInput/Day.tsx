import React from 'react';
import styled from '@emotion/styled';
import dayjs, { Dayjs } from 'dayjs';
import { noop } from '../../utils/helpers';

export interface DayProps {
  day?: number;
  month: number;
  year: number;
  daySelected?: Dayjs;
  onDaySelect?: (date: Dayjs) => void;
}

const Cell = styled.div`
  display: table-cell;
  padding: ${({ theme }) => `${theme.space[2]}px`};
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  border-radius: 50%;
  &[aria-selected='true'],
  &[aria-selected='true']:hover {
    background-color: ${({ theme }) => theme.colors['blue-400']};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors['navyblue-300']};
  }
`;

const DisabledCell = styled(Cell)`
  cursor: default;
  pointer-events: none;
`;

const Day: React.FC<DayProps> = ({ day, month, year, daySelected, onDaySelect = noop }) => {
  if (!day) {
    return <DisabledCell aria-disabled="true" />;
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
    <Cell
      role="gridcell"
      aria-disabled="false"
      aria-selected={isSelected()}
      tab-index="-1"
      aria-label={date.format('dd MMM DD YYYY')}
      onClick={onDaySelectClick}
    >
      {day}
    </Cell>
  );
};

export default React.memo(Day);
