import React from 'react';
import Box, { BoxProps } from '../Box';
import styled from '@emotion/styled';
import dayjs, { Dayjs } from 'dayjs';
import { noop, addOpacity } from '../../utils/helpers';

export interface DayProps {
  day?: number;
  isLastRow?: boolean;
  month: number;
  year: number;
  daySelected?: Dayjs;
  dayRangeSelected?: [Dayjs?, Dayjs?];
  onDaySelect?: (date: Dayjs) => void;
}

const PseudoOuterCell: React.FC<BoxProps> = props => (
  <Box
    display="table-cell"
    verticalAlign="middle"
    textAlign="center"
    cursor="pointer"
    position="relative"
    {...props}
  />
);

const OuterCell = styled(PseudoOuterCell)`
  [aria-relevant]:hover {
    background-color: ${({ theme }) => theme.colors['blue-300']};
  }
  [aria-placeholder] {
    position: absolute;
    z-index: 1;
    width: 50%;
    height: 100%;
    top: 0;
  }

  &[aria-busy='true'] + [aria-selected='true'],
  &[aria-selected='true'] + [aria-busy='true'],
  &[aria-selected='true'] + &[aria-selected='true'] {
    [aria-placeholder] {
      background-color: ${({ theme }) => addOpacity(theme.colors['navyblue-100'], 0.2)};
    }
  }

  &[aria-selected='true'] + &[aria-selected='true'] [aria-placeholder] {
    width: 100%;
    left: -50%;
  }
  &[aria-busy='true'] + &[aria-selected='true'] [aria-placeholder] {
    left: 0;
  }
  &[aria-selected='true'] + &[aria-busy='true'] [aria-placeholder] {
    left: -50%;
  }

  &[aria-selected='true'] [aria-relevant] {
    background-color: ${({ theme }) => theme.colors['blue-400']};
  }
  &[aria-busy='true'] [aria-relevant] {
    border-radius: 0;
    background-color: ${({ theme }) => addOpacity(theme.colors['navyblue-100'], 0.2)};
  }
  &[aria-disabled='true'] + &[aria-busy='true'] {
    [aria-relevant] {
      border-radius: 4px 0 0 4px;
    }
  }
  &[aria-busy='true'] {
    &:last-of-type [aria-relevant] {
      border-radius: 0 4px 4px 0;
    }
    &:first-of-type [aria-relevant] {
      border-radius: 4px 0 0 4px;
    }
    &:only-of-type [aria-relevant] {
      border-radius: 4px;
    }
  }
`;

const MemoOuterCell = React.memo(OuterCell);

const PseudoCell: React.FC<BoxProps> = props => (
  <Box padding={2} borderRadius="circle" position="relative" zIndex={2} {...props} />
);

const MemoCell = React.memo(PseudoCell);

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
    return isLastRow ? null : <MemoOuterCell aria-disabled="true" />;
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
    <MemoOuterCell
      aria-label={date.format('dd MMM DD YYYY')}
      onClick={onDaySelectClick}
      role="gridcell"
      aria-busy={isWithinRange()}
      aria-selected={isSelected()}
    >
      <Box aria-placeholder="true" tabIndex={-1} pointerEvents="none" />
      <MemoCell aria-relevant>{day}</MemoCell>
    </MemoOuterCell>
  );
};

export default React.memo(Day);
