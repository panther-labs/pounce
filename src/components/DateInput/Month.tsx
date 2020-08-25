import React from 'react';
import styled from '@emotion/styled';
import dayjs, { Dayjs } from 'dayjs';
import { chunk } from 'lodash';
import Flex from '../Flex';
import Day from './Day';
import { noop } from '../../utils/helpers';
export interface MonthProps {
  year: number;
  month: number;
  daySelected?: Dayjs;
  onDaySelect?: (date: Dayjs) => void;
}

const Abbr = styled.abbr`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: none;
`;

const Body = styled.div`
  display: table-row-group;
`;

const WeekRow = styled.div`
  display: table-row;
`;

const DAYS = [
  { abbr: 'Mo', name: 'Monday' },
  { abbr: 'Tu', name: 'Tuesday' },
  { abbr: 'We', name: 'Wednesday' },
  { abbr: 'Th', name: 'Thurdsday' },
  { abbr: 'Fr', name: 'Friday' },
  { abbr: 'Sa', name: 'Saturday' },
  { abbr: 'Su', name: 'Sunday' },
];

const getWeekCount = (year: number, month: number): number => {
  const firstDay = dayjs().month(month).year(year).date(1);
  const daysCount = firstDay.daysInMonth();
  const add = firstDay.day() === 0 ? 7 : firstDay.day();
  return Math.ceil((daysCount + add) / 7);
};

const Month: React.FC<MonthProps> = ({ year, month, daySelected, onDaySelect = noop }) => {
  const weeks = React.useMemo(() => {
    const weekCount = getWeekCount(year, month);
    const monthDate = dayjs().month(month).year(year).date(1);
    const daysCount = monthDate.daysInMonth();
    const start = monthDate.day();
    const days = Array(weekCount * 7);
    const step = start === 0 ? 7 : start;
    for (let index = 0; index <= daysCount; index++) {
      days[index + step - 2] = index;
    }
    return chunk(days, 7);
  }, [year, month]);

  return (
    <>
      <div>
        <Flex
          role="row"
          justify="space-around"
          mb={2}
          py={2}
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor="navyblue-300"
        >
          {DAYS.map(day => (
            <div role="columnheader" key={day.abbr}>
              <Abbr title={day.name}>{day.abbr}</Abbr>
            </div>
          ))}
        </Flex>
      </div>
      <Body>
        {weeks.map((week, monthIndex) => (
          // eslint-disable-next-line
          <WeekRow key={`${year}-${month}-${monthIndex}-week`}>
            {week.map((day, dayIndex) => (
              <Day
                onDaySelect={onDaySelect}
                daySelected={daySelected}
                year={year}
                month={month}
                day={day}
                key={
                  // eslint-disable-next-line
                  `${year}-${month}-${monthIndex}-${dayIndex}-week`
                }
              />
            ))}
          </WeekRow>
        ))}
      </Body>
    </>
  );
};

export default Month;
