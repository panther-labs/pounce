import React from 'react';
import { DayPickerProps } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dayjs from 'dayjs';
import TextInput, { TextInputProps } from '../TextInput';
import OverlayComponent from './OverlayComponent';
import { noop } from '../../utils/helpers';

export type DateInputProps = TextInputProps & {
  /**
   * A string that describes the format that will be shown to the user. Under the hood, DateInput
   * uses `dayjs` so the available values of this format can be found in its docs:
   * https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats
   * */
  format?: string;

  /**
   * A flag to determinate when time picker is displayed
   * */
  withTime?: boolean;

  /**
   * The passed date of the input component
   */
  value?: Date | string;

  /**
   * Additional props to paased down to `react-day-picker`
   */
  dayPickerProps?: DayPickerProps;

  /**
   * A callback for whenever the value of the chosen date changes.
   *
   * `(date: Date | null) => void`
   *
   */
  onChange: (date: Date) => void;
};

/**
 *
 * @param date The date to format
 * @param format The format string (i.e. DD/MM/YYYY)
 * @returns A string with the formatted date
 */
const formatDate = (date: Date, format: string): string => {
  return dayjs(date).format(format);
};

/**
 *
 * @param str The formatted date-string to extract the date from
 * @param format The format string (i.e. DD/MM/YYYY)
 * @returns A Date if the string could be parsed, else `undefined`
 */
const parseDate = (str: string, format: string): Date | undefined => {
  if (str.length !== format.length) {
    return undefined;
  }
  return dayjs(str).isValid() ? dayjs(str).toDate() : undefined;
};

/**
 * A component to help selecting dates in forms
 *
 * Apart from the props specified down below, you can pass any valid prop from the
 * <a href="/#/TextInput">TextInput</a> component (i.e. placeholder, etc.)
 *
 * */
const DateInput: React.FC<DateInputProps> = ({
  format = 'MM/DD/YYYY',
  value,
  withTime = false,
  dayPickerProps = {},
  onChange,
  ...rest
}) => {
  const [date, setDate] = React.useState(value);
  const [prevDate, setPrevDate] = React.useState(value);
  const _ref = React.useRef({});

  const onCancel = React.useCallback(() => {
    setDate(prevDate);
    // @ts-ignore
    onChange(prevDate);
    // @ts-ignore
    _ref?.current?.hideDayPicker();
  }, [onChange, setDate, setPrevDate, prevDate]);

  const onApply = React.useCallback(() => {
    // @ts-ignore
    onChange(date);
    setPrevDate(date);
    // @ts-ignore
    _ref?.current?.hideDayPicker();
  }, [onChange, date]);

  const onDateChanged = React.useCallback(
    dateChanged => {
      const oldDate = dayjs(date);
      const newDate = dayjs(dateChanged);
      const updated = newDate.hour(oldDate.hour()).minute(oldDate.minute());
      // @ts-ignore
      setDate(updated.toDate());
    },
    [setDate, date, prevDate]
  );

  const onTimeChange = React.useCallback(
    dateChanged => {
      setDate(dateChanged);
    },
    [setDate, date]
  );

  const Overlay = React.useCallback(
    props => {
      return (
        <OverlayComponent
          {...props}
          withTime={withTime}
          date={date}
          onApply={onApply}
          onTimeUpdate={onTimeChange}
          onCancel={onCancel}
          ref={_ref}
        />
      );
    },
    [_ref, onCancel, onApply, withTime]
  );

  return (
    <DayPickerInput
      overlayComponent={Overlay}
      dayPickerProps={dayPickerProps}
      onDayChange={onDateChanged}
      formatDate={formatDate}
      parseDate={parseDate}
      format={format}
      value={date}
      hideOnDayClick={false}
      // @ts-ignore ref passed in order to control the actual input element
      ref={_ref}
      component={(props: TextInputProps) => (
        <TextInput {...props} {...rest} onChange={noop} autoComplete="off" icon="calendar" />
      )}
    />
  );
};

export default React.memo(DateInput);
