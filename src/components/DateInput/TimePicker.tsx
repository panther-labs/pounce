import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Flex from '../Flex';
import Combobox from '../Combobox';

const hourItems = Array.from(Array(12), (_, i) => `0${i + 1}`.slice(-2));
const minsItems = Array.from(Array(60), (_, i) => `0${i}`.slice(-2));
const periodItems = ['AM', 'PM'];

interface TimePickerProps {
  date?: Date;
  onTimeUpdate: (date?: Dayjs) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ date, onTimeUpdate }) => {
  const day = dayjs(date);
  const hour = day.format('hh');
  const min = day.format('mm');
  const period = day.format('A');

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
    <Flex align="center" justify="center" borderTop="1px solid" borderColor="navyblue-300" p={4}>
      <Flex align="center" justify="center" spacing={3}>
        <Combobox
          searchable
          onChange={onChangeHours}
          label="Hours"
          hideLabel
          items={hourItems}
          value={hour}
        />

        <Combobox
          searchable
          onChange={onChangeMinutes}
          label="Minutes"
          hideLabel
          items={minsItems}
          value={min}
        />

        <Combobox
          onChange={onChangePeriod}
          label="Period"
          hideLabel
          items={periodItems}
          value={period}
        />
      </Flex>
    </Flex>
  );
};

export default React.memo(TimePicker);