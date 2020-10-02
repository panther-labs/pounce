import React, { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import Box from '../Box';
import Flex from '../Flex';
import Button from '../Button';
import Month from './Month';
import { IconButton } from '../../index';
import DateWrapper from './DateWrapper';
import TextInput, { TextInputProps } from '../TextInput';
import TimePicker from './TimePicker';
import { noop } from '../../utils/helpers';

export interface DateInputProps {
  /**
   * The position to expand the picker
   */
  alignment?: 'left' | 'right' | 'match-width';
  /**
   * The format displayed in the input element
   */
  format?: string;

  /**
   * A flag that dictates if the component should allow manipulating time
   */
  withTime?: boolean;

  /** The variant of the component that decides the colors */
  variant?: 'solid' | 'outline';

  /**
   * Date input format for time picker
   */
  mode?: '12h' | '24h';

  /**
   * A date that that works as a value
   */
  value?: Date;

  /**
   * A callback for whenever the value of the chosen date changes.
   *
   * `(date: Date | null) => void`
   *
   */
  onChange: (date?: Date) => void;
}

/**
 * A component to help selecting dates in forms
 *
 * Apart from the props specified down below, you can pass any valid prop from the
 * <a href="/#/TextInput">TextInput</a> component (i.e. placeholder, etc.)
 *
 * */
const DateInput: React.FC<DateInputProps & Omit<TextInputProps, 'value' | 'onChange'>> = ({
  value,
  format = 'MM/DD/YYYY',
  alignment,
  withTime,
  mode = '24h',
  variant = 'outline',
  onChange = noop,
  ...rest
}) => {
  const ref = React.useRef(null);
  const dateFormatted = value ? dayjs(value) : dayjs();
  const [currentMonth, setCurrentMonth] = useState(dateFormatted);
  const [currentDate, setCurrentDate] = useState(value);
  const [prevDate, setPrevDate] = useState(value);

  const [open, setOpen] = useState(false);

  const onNextMonth = useCallback(
    e => {
      e.preventDefault();
      const next = currentMonth.add(1, 'month');
      setCurrentMonth(next);
    },
    [currentMonth, setCurrentMonth]
  );
  const onPreviousMonth = useCallback(
    e => {
      e.preventDefault();
      const next = currentMonth.subtract(1, 'month');
      setCurrentMonth(next);
    },
    [currentMonth, setCurrentMonth]
  );

  const onCancel = useCallback(() => {
    setCurrentDate(prevDate);
    setOpen(false);
  }, [setOpen, prevDate, setCurrentDate]);

  const onApply = useCallback(
    e => {
      e.preventDefault();
      setPrevDate(currentDate);
      onChange(currentDate);
      setOpen(false);
    },
    [setOpen, setPrevDate, onChange, currentDate]
  );

  const onExpand = useCallback(
    e => {
      e.preventDefault();
      setOpen(true);
    },
    [setOpen]
  );

  const onDaySelect = useCallback(
    dateChanged => {
      const currentDate = dayjs(value);
      const updated = dateChanged.hour(currentDate.hour()).minute(currentDate.minute());
      setCurrentDate(updated.toDate());
    },
    [setCurrentDate]
  );

  const onTimeUpdate = useCallback(timeUpdated => {
    setCurrentDate(timeUpdated.toDate());
  }, []);

  return (
    <Box position="relative" ref={ref}>
      <Box onClick={onExpand} cursor="pointer">
        <TextInput
          {...rest}
          variant={variant}
          value={currentDate ? dayjs(currentDate).format(format) : ''}
          autoComplete="off"
          icon="calendar"
          aria-autocomplete="none"
          tabIndex={-1}
          readOnly
        />
      </Box>
      <DateWrapper targetRef={ref} alignment={alignment} isExpanded={open}>
        <Flex align="center" justify="space-between" p={4}>
          <IconButton
            onClick={onPreviousMonth}
            size="medium"
            icon="arrow-back"
            aria-label="Go to previous month"
          />
          <Box as="h4" fontSize="medium" fontWeight="bold" tabIndex="-1">
            {currentMonth.format('MMMM YYYY')}
          </Box>
          <IconButton
            onClick={onNextMonth}
            size="medium"
            icon="arrow-forward"
            aria-label="Go to next month"
          />
        </Flex>
        <Box px={4} pb={4}>
          <Month
            onDaySelect={onDaySelect}
            daySelected={currentDate && dayjs(currentDate)}
            year={currentMonth.year()}
            month={currentMonth.month()}
          />
        </Box>
        {withTime && (
          <Flex
            align="center"
            justify="center"
            borderTop="1px solid"
            borderColor="navyblue-300"
            p={4}
          >
            <Flex align="center" justify="center" spacing={3}>
              <TimePicker label="Time" mode={mode} onTimeUpdate={onTimeUpdate} date={currentDate} />
            </Flex>
          </Flex>
        )}

        <Flex align="center" justify="center" borderTop="1px solid" borderColor="navyblue-300">
          <Flex align="center" justify="center" p={3} spacing={3}>
            <Button onClick={onCancel} size="medium" variantColor="gray">
              Cancel
            </Button>
            <Button disabled={!currentDate} onClick={onApply} size="medium">
              Apply
            </Button>
          </Flex>
        </Flex>
      </DateWrapper>
    </Box>
  );
};

export default React.memo(DateInput);
