import React, { useState, useCallback } from 'react';
import { Dayjs } from 'dayjs';
import IconButton from 'components/IconButton';
import Box from 'components/Box';
import Presets from './Presets';
import Flex from 'components/Flex';
import Button from 'components/Button';
import DoubleTextInput from './DoubleTextInput';
import DateWrapper from 'components/DateInput/DateWrapper';
import TimePicker from 'components/DateInput/TimePicker';
import Month from 'components/DateInput/Month';
import ClearButton from 'components/DateInput/ClearButton';
import { TextInputProps } from 'components/TextInput';
import { dateToDayjs, noop, now } from 'utils/helpers';
import useEscapeKey from 'utils/useEscapeKey';
import usePrevious from 'utils/usePrevious';
import useOutsideClick from 'utils/useOutsideClick';
import useDisclosure from 'utils/useDisclosure';

export interface DateRangeInputProps {
  /**
   * The position to expand the picker
   */
  alignment?: 'left' | 'right' | 'match-width';
  /**
   * The format displayed in the input elements
   */
  format?: string;

  /**
   * A flag that allows clearing the values
   */
  disableReset?: boolean;

  /**
   * Date range input format for time picker
   */
  mode?: '12h' | '24h';

  /**
   * Whether the component should show presets
   */
  withPresets?: boolean;

  /** The variant of the component that decides the colors */
  variant?: 'solid' | 'outline';

  /**
   * A flag that dictates if the component should allow manipulating time
   */
  withTime?: boolean;

  /**
   * The label for the range start input
   */
  labelStart: string;

  /**
   * The label for the range end input
   */
  labelEnd: string;

  /**
   * The placeholder for the range start input
   */
  placeholderStart?: string;

  /**
   * The placeholder for the range end input
   */
  placeholderEnd?: string;

  /**
   * A date range that works as a value
   */
  value?: [Date?, Date?];

  /**
   * Specifies the timezone that will be used when selecting dates
   */
  timezone?: 'local' | 'utc';

  /**
   * A callback for whenever the value of the chosen date range changes.
   *
   * `(dates: [Date, Date]) => void`
   *
   */
  onChange: (date: [Date?, Date?]) => void;
}

/**
 * Converts the provided Dates into Dayjs objects, if they exist
 */
const datesToDayjs = (value: [Date?, Date?], timezone: 'local' | 'utc'): [Dayjs?, Dayjs?] => {
  return [dateToDayjs(value[0], timezone), dateToDayjs(value[1], timezone)];
};

const areDatesUndefined = (dates?: [Dayjs?, Dayjs?]) => !!dates && dates.every(date => !date);

const DateRangeInput: React.FC<
  DateRangeInputProps &
    Omit<
      TextInputProps,
      'value' | 'onChange' | 'label' | 'placeholder' | 'icon' | 'iconProps' | 'iconAlignment'
    >
> = ({
  value = [],
  format = 'MM/DD/YYYY',
  mode = '24h',
  withTime,
  variant = 'outline',
  disableReset = false,
  withPresets,
  onChange = noop,
  labelStart,
  alignment,
  labelEnd,
  placeholderStart,
  placeholderEnd,
  timezone = 'local',
  ...rest
}) => {
  const [currentDateRange, setCurrentRange] = useState(datesToDayjs(value, timezone));
  const [currentMonth, setCurrentMonth] = useState(currentDateRange[0] || now(timezone));

  const { isOpen, open, close } = useDisclosure();
  const previousDateRange = usePrevious(datesToDayjs(value, timezone));

  const ref = React.useRef(null);
  const targetRef = React.useRef(null);

  // Handles value & timezone updates outside of the component (i.e. a form has re-initialized or
  // has updated its values as a result of an API call)
  React.useEffect(() => {
    setCurrentRange(datesToDayjs(value, timezone));
  }, [value, timezone]);

  const onCancel = useCallback(() => {
    setCurrentRange(datesToDayjs(value, timezone));
    close();
  }, [value, timezone, setCurrentRange, close]);

  const resetLabel = React.useMemo(() => (withTime ? 'Clear Dates & Time' : 'Clear Dates'), [
    withTime,
  ]);

  const onApply = useCallback(
    e => {
      // To avoid inconsistent results round the start and end dates to the
      // nearest minute (or day if the time picker is disabled)
      const timeUnit = withTime ? 'minute' : 'day';
      e.preventDefault();
      onChange([
        currentDateRange[0] ? currentDateRange[0].startOf(timeUnit).toDate() : undefined,
        currentDateRange[1] ? currentDateRange[1].endOf(timeUnit).toDate() : undefined,
      ]);
      close();
    },
    [close, onChange, currentDateRange]
  );

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

  // Close on ESC key presses
  useEscapeKey({ ref, callback: onCancel, disabled: !isOpen });

  // Close popover on clicks outside
  useOutsideClick({
    refs: [ref, targetRef],
    callback: onCancel,
    disabled: !isOpen,
  });

  const onDaySelect = useCallback(
    (dateChanged: Dayjs) => {
      if (!currentDateRange[0]) {
        return setCurrentRange([dateChanged]);
      }

      const start = currentDateRange[0];
      const end = currentDateRange[1];

      if (!start) {
        return setCurrentRange([dateChanged]);
      }

      if (!end) {
        if (dateChanged.isBefore(start, 'date')) {
          return setCurrentRange([dateChanged.hour(start.hour()).minute(start.minute()), start]);
        }

        return setCurrentRange([start, dateChanged]);
      }

      if (dateChanged.isBefore(start, 'date') || start.isSame(end, 'date')) {
        return setCurrentRange([dateChanged.hour(start.hour()).minute(start.minute())]);
      }

      if (dateChanged.isAfter(start, 'date') && dateChanged.isBefore(end, 'date')) {
        return setCurrentRange([dateChanged.hour(start.hour()).minute(start.minute()), end]);
      }

      return setCurrentRange([start, dateChanged.hour(end.hour()).minute(end.minute())]);
    },
    [setCurrentRange, currentDateRange]
  );

  const onClear = useCallback(() => {
    setCurrentRange([undefined, undefined]);
  }, [setCurrentRange]);

  const isDisabled = React.useMemo(() => {
    if (areDatesUndefined(previousDateRange) && areDatesUndefined(currentDateRange)) {
      return true;
    }
    if (currentDateRange[0] && !currentDateRange[1]) {
      return true;
    }

    return currentDateRange.every((date, index) => {
      return (
        date &&
        previousDateRange &&
        previousDateRange[index] &&
        (date as Dayjs).isSame(previousDateRange[index] as Dayjs, withTime ? 'minute' : 'day')
      );
    });
  }, [currentDateRange, previousDateRange]);

  const onPresetSelect = useCallback(
    ([start, end]: [Dayjs, Dayjs]) => {
      setCurrentRange([start, end]);
    },
    [setCurrentRange]
  );

  const onStartTimeUpdate = useCallback(
    timeUpdated => {
      return setCurrentRange([timeUpdated, currentDateRange[1]]);
    },
    [setCurrentRange, currentDateRange]
  );

  const onEndTimeUpdate = useCallback(
    timeUpdated => {
      return setCurrentRange([currentDateRange[0], timeUpdated]);
    },
    [setCurrentRange, currentDateRange]
  );

  const nextMonth = currentMonth.add(1, 'month');
  return (
    <Box position="relative" zIndex={1} ref={targetRef}>
      <Box onClick={open}>
        <DoubleTextInput
          {...rest}
          variant={variant}
          from={currentDateRange[0] ? currentDateRange[0].format(format) : ''}
          to={currentDateRange[1] ? currentDateRange[1].format(format) : ''}
          labelFrom={labelStart}
          labelTo={labelEnd}
          placeholderFrom={placeholderStart}
          placeholderTo={placeholderEnd}
          onChangeFrom={noop}
          onChangeTo={noop}
          readOnly
          autoComplete="off"
        />
      </Box>
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
        <Flex>
          {withPresets && (
            <Presets
              setCurrentMonth={setCurrentMonth}
              timezone={timezone}
              onSelect={onPresetSelect}
              currentDateRange={currentDateRange}
            />
          )}
          <Box>
            <Flex align="center" justify="space-between" px={4} py={22} position="relative">
              <Box position="absolute" left={4}>
                <IconButton
                  size="medium"
                  onClick={onPreviousMonth}
                  icon="arrow-back"
                  aria-label="Go to previous month"
                />
              </Box>
              <Box as="h4" fontSize="medium" fontWeight="bold" width="50%" textAlign="center">
                {currentMonth.format('MMMM YYYY')}
              </Box>
              <Box as="h4" fontSize="medium" fontWeight="bold" width="50%" textAlign="center">
                {nextMonth.format('MMMM YYYY')}
              </Box>
              <Box position="absolute" right={4}>
                <IconButton
                  onClick={onNextMonth}
                  size="medium"
                  icon="arrow-forward"
                  aria-label="Go to next month"
                />
              </Box>
            </Flex>
            <Box px={4} pb={4}>
              <Flex spacing={8}>
                <Box>
                  <Month
                    onDaySelect={onDaySelect}
                    daysSelected={currentDateRange}
                    year={currentMonth.year()}
                    month={currentMonth.month()}
                    timezone={timezone}
                  />
                </Box>
                <Box>
                  <Month
                    onDaySelect={onDaySelect}
                    daysSelected={currentDateRange}
                    year={nextMonth.year()}
                    month={nextMonth.month()}
                    timezone={timezone}
                  />
                </Box>
              </Flex>
            </Box>

            {withTime && (
              <Flex
                align="center"
                justify="space-between"
                borderTop="1px solid"
                borderColor="navyblue-300"
                p={4}
              >
                <TimePicker
                  label="From Time"
                  mode={mode}
                  onTimeUpdate={onStartTimeUpdate}
                  date={currentDateRange[0]}
                  timezone={timezone}
                />
                <TimePicker
                  mode={mode}
                  label="To Time"
                  onTimeUpdate={onEndTimeUpdate}
                  date={currentDateRange[1]}
                  timezone={timezone}
                />
              </Flex>
            )}

            <Flex
              align="center"
              spacing={3}
              justify={disableReset && 'center'}
              borderTop="1px solid"
              p={3}
              borderColor="navyblue-300"
            >
              {!disableReset && (
                <Box align="center" justifySelf="flex-start">
                  <ClearButton onClick={onClear}>{resetLabel}</ClearButton>
                </Box>
              )}
              <Flex
                align="center"
                justifySelf={!disableReset && 'flex-end'}
                ml={!disableReset && 'auto'}
                justify="center"
                spacing={3}
              >
                <Button onClick={onCancel} size="medium" variantColor="gray">
                  Cancel
                </Button>
                <Button disabled={isDisabled} onClick={onApply} size="medium">
                  Apply
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </DateWrapper>
    </Box>
  );
};

export default React.memo(DateRangeInput);
