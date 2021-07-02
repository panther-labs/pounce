import React, { useState, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Box from 'components/Box';
import Flex from 'components/Flex';
import Button from 'components/Button';
import Month from './Month';
import IconButton from 'components/IconButton';
import DateWrapper from './DateWrapper';
import TextInput, { TextInputProps } from 'components/TextInput';
import TimePicker from './TimePicker';
import ClearButton from './ClearButton';
import { noop, dateToDayjs, now } from 'utils/helpers';
import useDisclosure from 'utils/useDisclosure';
import useEscapeKey from 'utils/useEscapeKey';
import usePrevious from 'utils/usePrevious';
import useOutsideClick from 'utils/useOutsideClick';

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

  /**
   * A flag that allows clearing the values
   */
  disableReset?: boolean;

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
   * Specifies the timezone that will be used when selecting a date
   */
  timezone?: 'local' | 'utc';

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
  disableReset = false,
  variant = 'outline',
  onChange = noop,
  timezone = 'local',
  ...rest
}) => {
  const ref = React.useRef(null);
  const targetRef = React.useRef(null);
  const [currentDate, setCurrentDate] = useState(dateToDayjs(value, timezone));
  const [currentMonth, setCurrentMonth] = useState(currentDate || now(timezone));
  const resetLabel = React.useMemo(() => (withTime ? 'Clear Date & Time' : 'Clear Date'), [
    withTime,
  ]);

  const { isOpen, open, close } = useDisclosure();
  const previousDate = usePrevious(dateToDayjs(value, timezone));

  // Handles value & timezone updates outside of the component (i.e. a form has re-initialized or
  // has updated its values as a result of an API call)
  React.useEffect(() => {
    setCurrentDate(dateToDayjs(value, timezone));
  }, [value, timezone]);

  const isDisabled = React.useMemo(() => {
    if (dayjs.isDayjs(currentDate) && dayjs.isDayjs(previousDate)) {
      return currentDate.isSame(previousDate, withTime ? 'minute' : 'day');
    }
    return currentDate === previousDate;
  }, [currentDate, previousDate]);

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
    setCurrentDate(dateToDayjs(value, timezone));
    close();
  }, [close, value, timezone, setCurrentDate]);

  const onClear = useCallback(() => setCurrentDate(dateToDayjs(undefined)), [setCurrentDate]);

  const onApply = useCallback(
    e => {
      e.preventDefault();
      onChange(currentDate?.startOf(withTime ? 'minute' : 'day').toDate());
      close();
    },
    [close, onChange, currentDate, disableReset]
  );

  const onDaySelect = useCallback(
    (dateChanged: Dayjs) => {
      let updated = dateChanged;
      if (currentDate) {
        updated = dayjs(currentDate)
          .year(dateChanged.year())
          .month(dateChanged.month())
          .date(dateChanged.date());
      }
      setCurrentDate(updated);
    },
    [currentDate, setCurrentDate]
  );

  const onTimeUpdate = useCallback(timeUpdated => {
    setCurrentDate(timeUpdated);
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
        value={currentDate ? currentDate.format(format) : ''}
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
            daysSelected={currentDate && [currentDate]}
            year={currentMonth.year()}
            month={currentMonth.month()}
            timezone={timezone}
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
              <TimePicker
                label="Time"
                mode={mode}
                onTimeUpdate={onTimeUpdate}
                timezone={timezone}
                date={currentDate}
              />
            </Flex>
          </Flex>
        )}

        <Flex align="center" justify="center" borderTop="1px solid" borderColor="navyblue-300">
          <Flex align="center" justify="center" p={3} spacing={3}>
            <Button onClick={onCancel} size="medium" variantColor="gray">
              Cancel
            </Button>
            <Button disabled={isDisabled} onClick={onApply} size="medium">
              Apply
            </Button>
          </Flex>
        </Flex>
        {!disableReset && (
          <Flex align="center" justify="center" pb={3}>
            <ClearButton onClick={onClear}>{resetLabel}</ClearButton>
          </Flex>
        )}
      </DateWrapper>
    </Box>
  );
};

export default React.memo(DateInput);
