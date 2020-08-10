import React from 'react';
import Flex from '../Flex';
import TimePickerSlot from './TimePickerSlot';

interface TimePickerProps {
  date?: { from: Date; to: Date };
  onTimeUpdate: (date: { from?: Date; to?: Date }) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ date, onTimeUpdate }) => {
  const fromDate = date?.from;
  const toDate = date?.to;

  const onFromTimeUpdate = React.useCallback(
    fromTime => {
      onTimeUpdate({ from: fromTime, to: date?.to });
    },
    [onTimeUpdate, date]
  );
  const onToTimeUpdate = React.useCallback(
    toTime => {
      onTimeUpdate({ to: toTime, from: date?.from });
    },
    [onTimeUpdate, date]
  );

  return (
    <Flex
      align="center"
      justify="center"
      borderTop="1px solid"
      borderColor="navyblue-300"
      mx={-24}
      mt={20}
    >
      <Flex align="center" justify="center" p={3} pb={0}>
        <Flex mr={6}>
          <TimePickerSlot date={fromDate} onTimeUpdate={onFromTimeUpdate} />
        </Flex>
        <Flex>
          <TimePickerSlot date={toDate} onTimeUpdate={onToTimeUpdate} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default React.memo(TimePicker);
