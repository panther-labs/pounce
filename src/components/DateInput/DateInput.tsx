import React, { useState, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from '../Box';
import Flex from '../Flex';
import Button from '../Button';
import Month from './Month';
import { IconButton } from '../../index';
import DateWrapper from './DateWrapper';
import TextInput, { TextInputProps } from '../TextInput';
import TimePicker from './TimePicker';
import { noop } from '../../utils/helpers';
import useDisclosure from '../../utils/useDisclosure';
import useEscapeKey from '../../utils/useEscapeKey';
import useOutsideClick from '../../utils/useOutsideClick';

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
  const targetRef = React.useRef(null);
  const dateFormatted = value ? dayjs(value) : dayjs();
  const [currentMonth, setCurrentMonth] = useState(dateFormatted);
  const [currentDate, setCurrentDate] = useState(value);

  const { isOpen, open, close } = useDisclosure();

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
    setCurrentDate(value);
    close();
  }, [close, value, setCurrentDate]);

  const onApply = useCallback(
    e => {
      e.preventDefault();
      onChange(
        dayjs(currentDate)
          .startOf(withTime ? 'minute' : 'day')
          .toDate()
      );
      close();
    },
    [close, onChange, currentDate]
  );

  const onDaySelect = useCallback(
    (dateChanged: Dayjs) => {
      const updated = dayjs(currentDate)
        .year(dateChanged.year())
        .month(dateChanged.month())
        .date(dateChanged.date());
      setCurrentDate(updated.toDate());
    },
    [currentDate, setCurrentDate]
  );

  const onTimeUpdate = useCallback(timeUpdated => {
    setCurrentDate(timeUpdated.toDate());
  }, []);

  // Close on ESC key presses
  useEscapeKey({ ref, callback: onCancel, disabled: !isOpen });

  // Close popover on clicks outside
  useOutsideClick({
    refs: [ref, targetRef],
    callback: onCancel,
    disabled: !isOpen,
  });

  return (
    <Box position="relative" ref={targetRef}>
      <TextInput
        {...rest}
        variant={variant}
        value={currentDate ? dayjs(currentDate).format(format) : ''}
        onClick={open}
        autoComplete="off"
        aria-autocomplete="none"
        tabIndex={-1}
        readOnly
      />

      <Box position="absolute" top={2} right={3} zIndex={2}>
        <IconButton
          variant="unstyled"
          aria-label="Toggle picker"
          size="medium"
          icon="calendar"
          onClick={isOpen ? onCancel : open}
        />
      </Box>
      <DateWrapper ref={ref} targetRef={targetRef} alignment={alignment} isExpanded={isOpen}>
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
            daysSelected={currentDate && [dayjs(currentDate)]}
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
