import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dayjs from 'dayjs';
import TextInput, { TextInputProps } from './TextInput';

export type DateInputProps = TextInputProps & {
  /**
   * A string that describes the format that will be shown to the user. Under the hood, DateInput
   * uses `dayjs` so the available values of this format can be found in its docs:
   * https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats
   * */
  format?: string;

  /**
   * A string that represents the formatted Date. It will be parsed according to the given format
   * and converted to an actual date
   */
  value: string;

  /**
   * A callback for whenever the value of the chosen date changes.
   *
   * `(date: string | null) => void`
   *
   * The  value is formatted
   * using the same format string as the one provided through the props. The value becomes `''`
   * (empty string) if the user chose to clear the value of the DateInput
   */
  onChange: (date: string) => void;
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
  onChange,
  ...rest
}) => (
  <DayPickerInput
    onDayChange={date => onChange(date ? formatDate(date, format) : '')}
    formatDate={formatDate}
    parseDate={parseDate}
    format={format}
    value={value}
    component={(props: TextInputProps) => <TextInput {...props} {...rest} />}
  />
);

export default React.memo(DateInput);
