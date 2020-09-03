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

it('allows changing time options', async () => {
  const mock = jest.fn();
  const endDate = end.add(3, 'hour').minute(59);

  const { findByLabelText, getByLabelText, findByText } = await renderWithTheme(
    <DateRangeInput
      value={[start.toDate(), endDate.toDate()]}
      id="test-hours"
      labelStart="From date"
      labelEnd="To date"
      withTime
      onChange={mock}
    />
  );
  const input = await findByLabelText('From date');
  // Open the date input components
  await fireEvent.click(input);

  const endingHours = await getByLabelText('Ending Hours', { selector: 'input' });
  const endingMinutes = await getByLabelText('Ending Minutes', { selector: 'input' });
  const endingPeriod = await getByLabelText('Ending Period', { selector: 'input' });

  expect(endingHours.value).toBe('04');
  expect(endingMinutes.value).toBe('59');
  expect(endingPeriod.value).toBe('AM');

  fireEvent.change(endingHours, '07');
  fireEvent.change(endingMinutes, '22');

  const submitBtn = await findByText('Apply');
  await fireEvent.click(submitBtn);
  expect(mock).toHaveBeenCalled();

  const starting = dayjs(mock.mock.calls[0][0][0]);
  const ending = dayjs(mock.mock.calls[0][0][1]);

  // Format and assert dates without timezones in order to make it work
  // across workstations and the CI
  expect(starting.format('DD/MM/YYYY HH:mm A')).toBe('01/11/2020 01:02 AM');
  expect(ending.format('DD/MM/YYYY HH:mm A')).toBe('11/11/2020 04:59 AM');
});

it('allows passing a custom format', async () => {
  const mock = jest.fn();
  const { container } = await renderWithTheme(
    <DateRangeInput {...props} format="M MMM YYYY D dd" onChange={mock} />
  );
  expect(container).toMatchSnapshot();
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
