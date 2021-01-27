import React from 'react';
import { Dayjs } from 'dayjs';
import Box from '../Box';
import Combobox from '../Combobox';
import { now, slugify } from '../../utils/helpers';
import Flex from '../Flex';

const getHourItems = (mode: string) => {
  const limit = mode === '12h' ? 12 : 24;
  const gap = mode === '12h' ? 1 : 0;
  return Array.from(Array(limit), (_, i) => `0${i + gap}`.slice(-2));
};

const minsItems = Array.from(Array(60), (_, i) => `0${i}`.slice(-2));
const periodItems = ['AM', 'PM'];
const inputStyles = { input: { maxWidth: 75 } };

interface TimePickerProps {
  date?: Dayjs;
  label?: string;
  mode?: '12h' | '24h';
  onTimeUpdate: (date?: Dayjs) => void;
  timezone: 'local' | 'utc';
}

const TimePicker: React.FC<TimePickerProps> = ({
  date,
  onTimeUpdate,
  mode = '24h',
  label = '',
  timezone = 'local',
}) => {
  const is12Hours = mode === '12h';
  const day = date || now(timezone);
  const hour = is12Hours ? day.format('hh') : day.format('HH');
  const min = day.format('mm');
  const period = day.format('A');

  const hoursLabel = React.useMemo(() => `${label} Hours`.trim(), [label]);
  const minutesLabel = React.useMemo(() => `${label} Minutes`.trim(), [label]);
  const periodLabel = React.useMemo(() => `${label} Period`.trim(), [label]);

  const hourItems = getHourItems(mode);

  const onChangeHours = React.useCallback(
    hour => {
      let hourOfDay = parseInt(hour);
      if (mode === '12h') {
        if (period === 'AM') {
          hourOfDay = hourOfDay === 12 ? 0 : hourOfDay;
        } else {
          hourOfDay = hourOfDay === 12 ? 12 : hourOfDay + 12;
        }
      }
      onTimeUpdate(day.hour(hourOfDay));
    },
    [date, onTimeUpdate]
  );

  const onChangeMinutes = React.useCallback(minutes => onTimeUpdate(day.minute(minutes)), [
    date,
    onTimeUpdate,
  ]);

  const onChangePeriod = React.useCallback(
    period => {
      const diff = period === 'AM' ? -12 : 12;
      onTimeUpdate(day.hour(day.hour() + diff));
    },
    [date, onTimeUpdate]
  );

  return (
    <Flex align="center" justify="center" spacing={3} sx={inputStyles}>
      {label && !is12Hours && (
        <Box
          as="label"
          flexShrink={0}
          fontWeight="bold"
          role="status"
          pr={2}
          htmlFor={slugify(hoursLabel)}
        >
          {label}
        </Box>
      )}
      <Combobox
        id={slugify(hoursLabel)}
        searchable
        onChange={onChangeHours}
        label={hoursLabel}
        hideLabel
        items={hourItems}
        value={hour}
      />

      <Combobox
        id={slugify(minutesLabel)}
        searchable
        onChange={onChangeMinutes}
        label={minutesLabel}
        hideLabel
        items={minsItems}
        value={min}
      />

      {is12Hours && (
        <Combobox
          id={slugify(periodLabel)}
          onChange={onChangePeriod}
          label={periodLabel}
          hideLabel
          items={periodItems}
          value={period}
        />
      )}
    </Flex>
  );
};

export default React.memo(TimePicker);
