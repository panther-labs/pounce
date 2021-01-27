import React, { useState, useCallback } from 'react';
import { Dayjs } from 'dayjs';
import IconButton from '../IconButton';
import Box from '../Box';
import Presets from './Presets';
import Flex from '../Flex';
import Button from '../Button';
import DoubleTextInput from './DoubleTextInput';
import DateWrapper from '../DateInput/DateWrapper';
import TimePicker from '../DateInput/TimePicker';
import Month from '../DateInput/Month';
import { TextInputProps } from '../TextInput';
import { dateToDayjs, noop, now } from '../../utils/helpers';
import useEscapeKey from '../../utils/useEscapeKey';
import useOutsideClick from '../../utils/useOutsideClick';
import useDisclosure from '../../utils/useDisclosure';

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
  onChange: (date: [Date, Date]) => void;
}

/**
 * Converts the provided Dates into Dayjs objects, if they exist
 */
const datesToDayjs = (value: [Date?, Date?], timezone: 'local' | 'utc'): [Dayjs?, Dayjs?] => {
  return [dateToDayjs(value[0], timezone), dateToDayjs(value[1], timezone)];
};

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
  const ref = React.useRef(null);
  const targetRef = React.useRef(null);

  const onCancel = useCallback(() => {
    setCurrentRange(datesToDayjs(value, timezone));
    close();
  }, [value, timezone, setCurrentRange, close]);

  const onApply = useCallback(
    e => {
      if (!currentDateRange[0] || !currentDateRange[1]) {
        return;
      }
      // To avoid inconsistent results round the start and end dates to the
      // nearest minute (or day if the time picker is disabled)
      const timeUnit = withTime ? 'minute' : 'day';
      e.preventDefault();
      onChange([
        currentDateRange[0].startOf(timeUnit).toDate(),
        currentDateRange[1].endOf(timeUnit).toDate(),
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

  const isDisabled = useCallback(
    () => currentDateRange.length < 2 || currentDateRange.some(date => !date),
    [currentDateRange]
  );

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

            <Flex align="center" justify="center" borderTop="1px solid" borderColor="navyblue-300">
              <Flex align="center" justify="center" p={3} spacing={3}>
                <Button onClick={onCancel} size="medium" variantColor="gray">
                  Cancel
                </Button>
                <Button disabled={isDisabled()} onClick={onApply} size="medium">
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
