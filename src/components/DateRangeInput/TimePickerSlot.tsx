import React from 'react';
import dayjs from 'dayjs';
import Box from '../Box';
import Combobox from '../Combobox';

const daysItems = Array.from(Array(12), (_, i) => `0${i + 1}`.slice(-2));
const minsItems = Array.from(Array(60), (_, i) => `0${i}`.slice(-2));
const periodItems = ['AM', 'PM'];

interface TimePickerSlotProps {
  date?: Date;
  onTimeUpdate: (date?: Date) => void;
}

const TimePickerSlot: React.FC<TimePickerSlotProps> = ({ date, onTimeUpdate }) => {
  const day = dayjs(date);
  const hour = day.format('hh');
  const min = day.format('mm');
  const period = day.format('A');

  const onChangeHours = React.useCallback(
    hour => {
      const d = dayjs(date).hour(hour);
      onTimeUpdate(d.toDate());
    },
    [date, onTimeUpdate]
  );

  const onChangeMinutes = React.useCallback(
    minutes => {
      const d = dayjs(date).minute(minutes);
      onTimeUpdate(d.toDate());
    },
    [date, onTimeUpdate]
  );

  const onChangePeriod = React.useCallback(
    period => {
      const diff = period === 'AM' ? -12 : 12;
      const d = dayjs(date);
      const newDate = dayjs(date).hour(d.hour() + diff);
      onTimeUpdate(newDate.toDate());
    },
    [date, onTimeUpdate]
  );

  return (
    <>
      <Box>
        <Combobox onChange={onChangeHours} label="Hours" items={daysItems} value={hour} />
      </Box>
      <Box mx={1}>
        <Combobox onChange={onChangeMinutes} label="Minutes" items={minsItems} value={min} />
      </Box>
      <Box>
        <Combobox onChange={onChangePeriod} label="Period" items={periodItems} value={period} />
      </Box>
    </>
  );
};

export default React.memo(TimePickerSlot);
