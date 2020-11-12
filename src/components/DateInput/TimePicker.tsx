import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '../Box';
import Combobox from '../Combobox';
import { slugify } from '../../utils/helpers';

const getHourItems = (mode: string) => {
  const limit = mode === '12h' ? 12 : 24;
  const gap = mode === '12h' ? 1 : 0;
  return Array.from(Array(limit), (_, i) => `0${i + gap}`.slice(-2));
};

const minsItems = Array.from(Array(60), (_, i) => `0${i}`.slice(-2));
const periodItems = ['AM', 'PM'];

interface TimePickerProps {
  date?: Date;
  label?: string;
  mode?: '12h' | '24h';
  onTimeUpdate: (date?: Dayjs) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  date,
  onTimeUpdate,
  mode = '24h',
  label = '',
}) => {
  const is12Hours = mode === '12h';
  const day = dayjs(date);
  const hour = is12Hours ? day.format('hh') : day.format('HH');
  const min = day.format('mm');
  const period = day.format('A');

  const hoursLabel = React.useMemo(() => `${label} Hours`.trim(), [label]);
  const minutesLabel = React.useMemo(() => `${label} Minutes`.trim(), [label]);
  const periodLabel = React.useMemo(() => `${label} Period`.trim(), [label]);

  const hourItems = getHourItems(mode);

  const onChangeHours = React.useCallback(
    hour => {
      const d = dayjs(date).hour(hour);
      onTimeUpdate(d);
    },
    [date, onTimeUpdate]
  );
  const onChangeMinutes = React.useCallback(
    minutes => {
      const d = dayjs(date).minute(minutes);
      onTimeUpdate(d);
    },
    [date, onTimeUpdate]
  );

  const onChangePeriod = React.useCallback(
    period => {
      const diff = period === 'AM' ? -12 : 12;
      const d = dayjs(date);
      const newDate = dayjs(date).hour(d.hour() + diff);
      onTimeUpdate(newDate);
    },
    [date, onTimeUpdate]
  );

  return (
    <>
      {label && !is12Hours && (
        <Box
          as="label"
          flexShrink={0}
          fontWeight="bold"
          role="status"
          pr={4}
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
    </>
  );
};

export default React.memo(TimePicker);
