import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils, DayPickerProps } from 'react-day-picker';
import dayjs from 'dayjs';
import DoubleTextInput, { DoubleTextInputProps } from '../DoubleTextInput';
import OverlayComponent from './OverlayComponent';
import { noop } from '../../utils/helpers';

export type DateRangeInputProps = {
  /**
   * A string that describes the format that will be shown to the user. Under the hood, DateRangeInput
   * uses `dayjs` so the available values of this format can be found in its docs:
   * https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats
   * */
  format?: string;

  /**
   * A flag to determinate when time pickers are displayed
   * */
  withTime?: boolean;

  /**
   * The starting date of the range
   */
  start?: Date;

  /**
   * The ending date of the range
   */
  end?: Date;

  /**
   * Additional props to paased down to `react-day-picker`
   */
  dayPickerProps?: DayPickerProps;
  /**
   * A callback for whenever the value of the chosen date range is.
   * `(date?: { start?: Date; end?: Date }) => void`
   */
  onChange: (range?: { start?: Date; end?: Date }) => void;
};

/**
 *
 * @param date The date to format
 * @param format The format string (i.e. DD/MM/YYYY)
 * @returns A string with the formatted date
 */
const formatDate = (date: Date | undefined, format: string): string => {
  if (!date) {
    return '';
  }
  return dayjs(date).format(format);
};

/**
 * A component to help selecting dates in forms
 *
 * Apart from the props specified down below, you can pass any valid prop from the
 * <a href="/#/TextInput">TextInput</a> component (i.e. placeholder, etc.)
 *
 * */
const DateRangeInput: React.FC<DateRangeInputProps> = ({
  format = 'MM/DD/YYYY',
  start = undefined,
  end = undefined,
  withTime = false,
  dayPickerProps = {},
  onChange,
  ...rest
}) => {
  const [dateRange, setDateRange] = React.useState({ from: start, to: end });
  const [prevDateRange, setPrevDateRange] = React.useState({ from: start, to: end });

  const _ref = React.useRef({});

  const onCancel = React.useCallback(() => {
    setDateRange(prevDateRange);

    // @ts-ignore
    _ref?.current?.hideDayPicker();
  }, [onChange, setDateRange, setPrevDateRange, prevDateRange]);

  const onApply = React.useCallback(() => {
    const range = { start: dateRange.from, end: dateRange.to };
    setPrevDateRange(dateRange);
    onChange(range);
    // @ts-ignore
    _ref?.current?.hideDayPicker();
  }, [onChange, dateRange]);

  const onTimeChange = React.useCallback(
    dateRangeChanged => {
      setDateRange(dateRangeChanged);
    },
    [setDateRange, dateRange]
  );

  const Overlay = React.useCallback(
    props => {
      return (
        <OverlayComponent
          {...props}
          withTime={withTime}
          date={dateRange}
          onApply={onApply}
          onTimeUpdate={onTimeChange}
          onCancel={onCancel}
          ref={_ref}
        />
      );
    },
    [_ref, onCancel, onApply, withTime]
  );

  const onDayClick = (day: Date) => {
    // @ts-ignore
    const range = DateUtils.addDayToRange(day, dateRange);
    setDateRange(range);
  };

  const { from, to } = dateRange;

  const modifiers = { start: from, end: to };
  const selectedDays = from && to ? { from, to } : undefined;
  const renderDay = (day: Date) => (
    <>
      <div className="day">{dayjs(day).format('D')}</div>
      <div className="highlight"></div>
      <div className="bg"></div>
    </>
  );

  const passedDayPickerProps = {
    ...dayPickerProps,
    numberOfMonths: 2,
    selectedDays,
    modifiers,
    onDayClick,
    renderDay,
  };

  return (
    <>
      <DayPickerInput
        overlayComponent={Overlay}
        formatDate={formatDate}
        format={format}
        dayPickerProps={passedDayPickerProps}
        hideOnDayClick={false}
        keepFocus={false}
        // @ts-ignore ref passed in order to control the actual input element
        ref={_ref}
        // Drop value and onChange in order to avoid event bubbling
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        component={({ value, onChange, ...props }: DoubleTextInputProps) => {
          return (
            <DoubleTextInput
              {...props}
              {...rest}
              from={formatDate(dateRange.from, format)}
              to={formatDate(dateRange.to, format)}
              labelFrom="Date & Time (start)"
              labelTo="Date & Time (end)"
              onChangeFrom={noop}
              onChangeTo={noop}
              autoComplete="off"
              icon="calendar"
            />
          );
        }}
      />
    </>
  );
};

export default React.memo(DateRangeInput);
