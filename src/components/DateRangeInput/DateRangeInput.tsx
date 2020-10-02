import React, { useState, useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { IconButton } from '../../index';
import Box from '../Box';
import Presets from './Presets';
import Flex from '../Flex';
import Button from '../Button';
import DoubleTextInput from './DoubleTextInput';
import DateWrapper from '../DateInput/DateWrapper';
import TimePicker from '../DateInput/TimePicker';
import Month from '../DateInput/Month';
import { TextInputProps } from '../TextInput';
import { noop, getDates } from '../../utils/helpers';

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
  value: Date[];

  /**
   * A callback for whenever the value of the chosen date range changes.
   *
   * `(dates: [Date, Date] | null) => void`
   *
   */
  onChange: (date: Date[]) => void;
}

const dateToDayjs = (value: Date[]): Dayjs[] => {
  return value.map(v => dayjs(v)) as Dayjs[];
};

const convertToDayjs = (value: Date[]): Dayjs[] => {
  const { now } = getDates();
  if (!value || !Array.isArray(value) || value.length < 2) {
    return [now, now];
  }
  return dateToDayjs(value);
};

const DateRangeInput: React.FC<
  DateRangeInputProps &
    Omit<
      TextInputProps,
      'value' | 'onChange' | 'label' | 'placeholder' | 'icon' | 'iconProps' | 'iconAlignment'
    >
> = ({
  value,
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
  ...rest
}) => {
  const datesFormatted = convertToDayjs(value);
  const [currentDateRange, setCurrentRange] = useState(value);
  const [currentMonth, setCurrentMonth] = useState(datesFormatted[0]);
  const [prevDateRange, setPrevDateRange] = useState(value);

  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  const nextMonth = currentMonth.add(1, 'month');

  const onCancel = useCallback(() => {
    setCurrentRange(prevDateRange);
    setOpen(false);
  }, [setOpen, prevDateRange, setCurrentRange]);

  const onApply = useCallback(
    e => {
      e.preventDefault();
      setPrevDateRange(currentDateRange);
      onChange(currentDateRange);
      setOpen(false);
    },
    [setOpen, setPrevDateRange, onChange, currentDateRange]
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

  const formatDate = useCallback(
    (values, key) => {
      if (!values || !Array.isArray(values)) {
        return '';
      }
      return values[key] ? dayjs(values[key]).format(format) : '';
    },
    [format]
  );
  const onExpand = useCallback(
    e => {
      e.preventDefault();
      setOpen(true);
    },
    [setOpen]
  );

  const onDaySelect = useCallback(
    (dateChanged: Dayjs) => {
      if (!currentDateRange || currentDateRange?.length === 0) {
        return setCurrentRange([dateChanged.toDate()]);
      }

      const start = dayjs(currentDateRange[0]);
      const end = dayjs(currentDateRange[1]);

      if (dateChanged.isBefore(start, 'date') || start.isSame(end, 'date')) {
        return setCurrentRange([dateChanged.hour(start.hour()).minute(start.minute()).toDate()]);
      }

      if (currentDateRange[1]) {
        if (dateChanged.isAfter(start, 'date') && dateChanged.isBefore(end, 'date')) {
          return setCurrentRange([
            dateChanged.hour(start.hour()).minute(start.minute()).toDate(),
            currentDateRange[1],
          ]);
        }
      }

      return setCurrentRange([currentDateRange[0], dateChanged.toDate()]);
    },
    [setCurrentRange, currentDateRange]
  );

  const isDisabled = useCallback(() => !currentDateRange || currentDateRange?.length < 2, [
    currentDateRange,
  ]);

  const onPresetSelect = useCallback(
    ([start, end]: [Dayjs, Dayjs]) => {
      setCurrentRange([start.toDate(), end.toDate()]);
    },
    [setCurrentRange]
  );

  const onStartTimeUpdate = useCallback(
    timeUpdated => {
      if (!currentDateRange || currentDateRange?.length < 2) {
        return setCurrentRange([timeUpdated.toDate()]);
      }
      return setCurrentRange([timeUpdated.toDate(), currentDateRange[1]]);
    },
    [setCurrentRange, currentDateRange]
  );

  const onEndTimeUpdate = useCallback(
    timeUpdated => {
      if (!currentDateRange || currentDateRange?.length < 2) {
        return setCurrentRange([undefined, timeUpdated.toDate()]);
      }
      return setCurrentRange([currentDateRange[0], timeUpdated.toDate()]);
    },
    [setCurrentRange, currentDateRange]
  );

  return (
    <Box position="relative" zIndex={1} ref={ref}>
      <Box onClick={onExpand} cursor="pointer">
        <DoubleTextInput
          {...rest}
          variant={variant}
          from={formatDate(currentDateRange, 0)}
          to={formatDate(currentDateRange, 1)}
          labelFrom={labelStart}
          labelTo={labelEnd}
          placeholderFrom={placeholderStart}
          placeholderTo={placeholderEnd}
          onChangeFrom={noop}
          onChangeTo={noop}
          readOnly
          autoComplete="off"
          icon="calendar"
        />
      </Box>
      <DateWrapper targetRef={ref} alignment={alignment} isExpanded={open}>
        <Flex justify="columns">
          {withPresets && (
            <Presets
              setCurrentMonth={setCurrentMonth}
              onSelect={onPresetSelect}
              currentDateRange={convertToDayjs(currentDateRange)}
            />
          )}
          <Box>
            <Flex align="center" justify="space-between" px={4} py={22} position="relative">
              <Box position="absolute" left={4}>
                <IconButton
                  size="small"
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
                  size="small"
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
                    dayRangeSelected={currentDateRange && dateToDayjs(currentDateRange)}
                    year={currentMonth.year()}
                    month={currentMonth.month()}
                  />
                </Box>
                <Box>
                  <Month
                    onDaySelect={onDaySelect}
                    dayRangeSelected={currentDateRange && dateToDayjs(currentDateRange)}
                    year={nextMonth.year()}
                    month={nextMonth.month()}
                  />
                </Box>
              </Flex>
            </Box>

            {withTime && (
              <Flex
                align="center"
                justify="center"
                borderTop="1px solid"
                borderColor="navyblue-300"
                p={4}
                spacing={8}
              >
                <Flex align="center" justify="center" spacing={3}>
                  <TimePicker
                    label="From Time"
                    mode={mode}
                    onTimeUpdate={onStartTimeUpdate}
                    date={currentDateRange && currentDateRange[0]}
                  />
                </Flex>
                <Flex align="center" justify="center" spacing={3}>
                  <TimePicker
                    mode={mode}
                    label="To Time"
                    onTimeUpdate={onEndTimeUpdate}
                    date={currentDateRange && currentDateRange[1]}
                  />
                </Flex>
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
