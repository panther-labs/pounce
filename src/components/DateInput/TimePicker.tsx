import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Combobox from '../Combobox';

const hourItems = Array.from(Array(12), (_, i) => `0${i + 1}`.slice(-2));
const minsItems = Array.from(Array(60), (_, i) => `0${i}`.slice(-2));
const periodItems = ['AM', 'PM'];

interface TimePickerProps {
  date?: Date;
  label?: string;
  onTimeUpdate: (date?: Dayjs) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ date, onTimeUpdate, label = '' }) => {
  const day = dayjs(date);
  const hour = day.format('hh');
  const min = day.format('mm');
  const period = day.format('A');

  const hoursLabel = React.useMemo(() => `${label} Hours`.trim(), [label]);
  const minutesLabel = React.useMemo(() => `${label} Minutes`.trim(), [label]);
  const periodLabel = React.useMemo(() => `${label} Period`.trim(), [label]);

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
      <Combobox
        searchable
        onChange={onChangeHours}
        label={hoursLabel}
        hideLabel
        items={hourItems}
        value={hour}
      />

      <Combobox
        searchable
        onChange={onChangeMinutes}
        label={minutesLabel}
        hideLabel
        items={minsItems}
        value={min}
      />

      <Combobox
        onChange={onChangePeriod}
        label={periodLabel}
        hideLabel
        items={periodItems}
        value={period}
      />
    </>
  );
};

export default React.memo(TimePicker);
