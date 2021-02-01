import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import chunk from 'lodash/chunk';
import Flex from '../Flex';
import Box from '../Box';
import Day from './Day';
import { noop } from '../../utils/helpers';
export interface MonthProps {
  year: number;
  month: number;
  daysSelected?: [Dayjs?, Dayjs?];
  onDaySelect?: (date: Dayjs) => void;
  timezone: 'local' | 'utc';
}

const DAYS = [
  { abbr: 'Mo', name: 'Monday' },
  { abbr: 'Tu', name: 'Tuesday' },
  { abbr: 'We', name: 'Wednesday' },
  { abbr: 'Th', name: 'Thursday' },
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

const Month: React.FC<MonthProps> = ({
  year,
  month,
  daysSelected,
  timezone,
  onDaySelect = noop,
}) => {
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
            <Box role="columnheader" key={day.abbr}>
              <Box
                as="abbr"
                textDecoration="none"
                fontWeight="bold"
                fontSize="small"
                title={day.name}
              >
                {day.abbr}
              </Box>
            </Box>
          ))}
        </Flex>
      </div>
      <Box display="table" sx={{ borderCollapse: 'separate', borderSpacing: '0 2px' }}>
        <Box display="table-row-group">
          {weeks.map((week, monthIndex) => (
            // eslint-disable-next-line
            <Box display="table-row" key={`${year}-${month}-${monthIndex}-week`}>
              {week.map((day, dayIndex) => (
                <Day
                  onDaySelect={onDaySelect}
                  daysSelected={daysSelected}
                  year={year}
                  month={month}
                  day={day}
                  isLastRow={weeks.length === monthIndex + 1}
                  timezone={timezone}
                  key={
                    // eslint-disable-next-line
                    `${year}-${month}-${monthIndex}-${dayIndex}-week`
                  }
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Month;
