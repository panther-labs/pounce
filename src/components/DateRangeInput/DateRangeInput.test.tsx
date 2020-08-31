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

it('allows selecting a date with time options', async () => {
  const mock = jest.fn();
  const { findByLabelText, container } = await renderWithTheme(
    <DateRangeInput {...props} withTime onChange={mock} />
  );
  const input = await findByLabelText('From date');

  // Open the date input components
  await fireEvent.click(input);
  expect(container).toMatchSnapshot();
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
  const cellStart = await findByLabelText('Su Nov 01 2020');
  const cellEnd = await findByLabelText('Mo Nov 30 2020');
  const submitBtn = await findByText('Apply');

  await fireEvent.click(cellStart);
  await fireEvent.click(cellEnd);
  await fireEvent.click(submitBtn);

  expect(mock).toHaveBeenCalled();
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
