import React from 'react';
import { renderWithTheme, fireEvent } from 'test-utils';
import dayjs from 'dayjs';
import DateRangeInput from './DateRangeInput';

const month = 10;
const year = 2020;
const day = 1;
const start = dayjs().date(day).month(month).year(year).hour(1).minute(2);
const end = start.add(10, 'day');

const props = {
  id: 'test',
  labelStart: 'From date',
  labelEnd: 'To date',
  value: [start.toDate(), end.toDate()],
};

it('renders', async () => {
  const mock = jest.fn();
  const { container } = await renderWithTheme(<DateRangeInput {...props} onChange={mock} />);
  expect(container).toMatchSnapshot();
});

it('opens the month picker', async () => {
  const mock = jest.fn();
  const { findByLabelText, container } = await renderWithTheme(
    <DateRangeInput {...props} onChange={mock} />
  );
  const inputFrom = await findByLabelText('From date');
  await fireEvent.click(inputFrom);
  expect(container).toMatchSnapshot();
});

it('opens the month picker with empty value', async () => {
  const mock = jest.fn();
  const { findByLabelText, container } = await renderWithTheme(
    <DateRangeInput {...props} value={[]} onChange={mock} />
  );
  const inputFrom = await findByLabelText('From date');
  await fireEvent.click(inputFrom);
  expect(container).toMatchSnapshot();
});

it('allows browsing through months', async () => {
  const mock = jest.fn();
  const { findByLabelText } = await renderWithTheme(<DateRangeInput {...props} onChange={mock} />);
  const input = await findByLabelText('From date');

  // Open the date input components
  await fireEvent.click(input);

  expect(await findByLabelText('Su Nov 01 2020')).toBeInTheDocument();
  const prev = await findByLabelText('Go to previous month');

  // Go to October
  await prev.click(input);
  expect(await findByLabelText('Th Oct 01 2020')).toBeInTheDocument();
  const next = await findByLabelText('Go to next month');

  // Go to December
  await next.click(input);
  await next.click(input);
  expect(await findByLabelText('We Dec 02 2020')).toBeInTheDocument();
});

it('renders with time options', async () => {
  const mock = jest.fn();

  const { container } = await renderWithTheme(<DateRangeInput {...props} onChange={mock} />);

  expect(container).toMatchSnapshot();
});

it('allows changing time options in 24h mode', async () => {
  const mock = jest.fn();
  const endDate = end.add(3, 'hour').minute(59);

  const {
    container,
    findByLabelText,
    getByLabelText,
    findByText,
    findByTestId,
  } = await renderWithTheme(
    <DateRangeInput
      value={[start.toDate(), endDate.toDate()]}
      id="test-hours"
      mode="24h"
      format="DD/MM/YYYY HH:mm A"
      labelStart="From date"
      labelEnd="To date"
      withTime
      onChange={mock}
    />
  );
  const input = await findByLabelText('From date');
  // Open the date input components
  await fireEvent.click(input);

  const endingHours = await getByLabelText('To Time Hours', { selector: 'input' });
  const endingMinutes = await getByLabelText('To Time Minutes', { selector: 'input' });

  expect(endingHours.value).toBe('04');
  expect(endingMinutes.value).toBe('59');

  expect(container).toMatchSnapshot();

  await fireEvent.focus(endingHours);
  const sixOhClock = await findByTestId('to-time-hours-16');
  await fireEvent.click(sixOhClock);

  await fireEvent.focus(endingMinutes);
  const fiftyMinutes = await findByTestId('to-time-minutes-50');
  await fireEvent.click(fiftyMinutes);

  const submitBtn = await findByText('Apply');
  await fireEvent.click(submitBtn);

  const starting = dayjs(mock.mock.calls[0][0][0]);
  const ending = dayjs(mock.mock.calls[0][0][1]);

  // Format and assert dates without timezones in order to make it work
  // across workstations and the CI
  expect(starting.format('DD/MM/YYYY HH:mm A')).toBe('01/11/2020 01:02 AM');
  expect(ending.format('DD/MM/YYYY HH:mm A')).toBe('11/11/2020 16:50 PM');
});

it('allows changing time options in 12h mode', async () => {
  const mock = jest.fn();
  const endDate = end.add(3, 'hour').minute(59);

  const { findByLabelText, getByLabelText, findByText, findByTestId } = await renderWithTheme(
    <DateRangeInput
      value={[start.toDate(), endDate.toDate()]}
      id="test-hours"
      mode="12h"
      labelStart="From date"
      labelEnd="To date"
      withTime
      onChange={mock}
    />
  );
  const input = await findByLabelText('From date');
  // Open the date input components
  await fireEvent.click(input);

  const endingHours = await getByLabelText('To Time Hours', { selector: 'input' });
  const endingMinutes = await getByLabelText('To Time Minutes', { selector: 'input' });
  const endingPeriod = await getByLabelText('To Time Period', { selector: 'input' });

  expect(endingHours.value).toBe('04');
  expect(endingMinutes.value).toBe('59');
  expect(endingPeriod.value).toBe('AM');

  await fireEvent.focus(endingHours);
  const sixOhClock = await findByTestId('to-time-hours-07');
  await fireEvent.click(sixOhClock);

  await fireEvent.focus(endingMinutes);
  const fiftyMinutes = await findByTestId('to-time-minutes-22');
  await fireEvent.click(fiftyMinutes);

  const submitBtn = await findByText('Apply');
  await fireEvent.click(submitBtn);
  expect(mock).toHaveBeenCalled();

  const starting = dayjs(mock.mock.calls[0][0][0]);
  const ending = dayjs(mock.mock.calls[0][0][1]);

  // Format and assert dates without timezones in order to make it work
  // across workstations and the CI
  expect(starting.format('DD/MM/YYYY HH:mm A')).toBe('01/11/2020 01:02 AM');
  expect(ending.format('DD/MM/YYYY HH:mm A')).toBe('11/11/2020 07:22 AM');
});

it('allows passing a custom format', async () => {
  const mock = jest.fn();
  const format = 'M MMM YYYY D dd';
  const { container, findByLabelText } = await renderWithTheme(
    <DateRangeInput {...props} format={format} onChange={mock} />
  );

  expect(container).toMatchSnapshot();

  const inputStart = await findByLabelText('From date');
  const inputEnd = await findByLabelText('To date');
  await fireEvent.click(inputStart);

  const cellStart = await findByLabelText('Su Nov 01 2020');
  const cellEnd = await findByLabelText('Mo Nov 30 2020');

  await fireEvent.click(cellStart);
  await fireEvent.click(cellEnd);

  expect(inputStart.value).toBe('11 Nov 2020 1 Su');
  expect(inputEnd.value).toBe('11 Nov 2020 11 We');
});

it('allows selecting a preset', async () => {
  const mock = jest.fn();
  const { container, findByLabelText, findByText } = await renderWithTheme(
    <DateRangeInput {...props} onChange={mock} withPresets />
  );
  const input = await findByLabelText('From date');

  // Open the date input components
  await fireEvent.click(input);

  expect(await findByLabelText('Su Nov 01 2020')).toBeInTheDocument();
  const preset = await findByLabelText('Last Week');
  const submitBtn = await findByText('Apply');

  await fireEvent.click(preset);
  await fireEvent.click(submitBtn);

  expect(mock).toHaveBeenCalled();
  // Since the presets are dynamic and based on the current date we need to ensure
  // that the appropriate range is selected
  const start = dayjs(mock.mock.calls[0][0][0]);
  const end = dayjs(mock.mock.calls[0][0][1]);

  const sevenDaysInMillis = 24 * 60 * 60 * 1000 * 7;
  expect(start.isBefore(end)).toBe(true);
  expect(end.diff(start)).toBe(sevenDaysInMillis);
  expect(container).toMatchSnapshot();
});

it('allows selecting a date range', async () => {
  const mock = jest.fn();
  const { container, findByLabelText, findByText } = await renderWithTheme(
    <DateRangeInput {...props} onChange={mock} />
  );
  const input = await findByLabelText('From date');

  // Open the date input components
  await fireEvent.click(input);

  expect(await findByLabelText('Su Nov 01 2020')).toBeInTheDocument();
  const cellStart = await findByLabelText('Su Nov 01 2020');
  const cellEnd = await findByLabelText('Mo Nov 30 2020');
  const submitBtn = await findByText('Apply');

  await fireEvent.click(cellStart);
  await fireEvent.click(cellEnd);
  await fireEvent.click(submitBtn);

  expect(mock).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});
