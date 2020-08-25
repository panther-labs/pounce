import React from 'react';
import { renderWithTheme, fireEvent } from 'test-utils';
import dayjs from 'dayjs';
import DateInput from './DateInput';

const month = 10;
const year = 2020;
const day = 1;
const date = dayjs().date(day).month(month).year(year).hour(1).minute(2);

describe('DateInput', () => {
  it('renders', async () => {
    const mock = jest.fn();
    const { container } = await renderWithTheme(
      <DateInput label="test" date={date.toDate()} onChangeDate={mock} />
    );
    expect(container).toMatchSnapshot();
  });

  it('opens the month picker', async () => {
    const mock = jest.fn();
    const { findByLabelText, container } = await renderWithTheme(
      <DateInput label="test" date={date.toDate()} onChangeDate={mock} />
    );
    const input = await findByLabelText('test');
    await fireEvent.click(input);
    expect(container).toMatchSnapshot();
  });

  it('allows browsing through months', async () => {
    const mock = jest.fn();
    const { findByLabelText } = await renderWithTheme(
      <DateInput label="test" date={date.toDate()} onChangeDate={mock} />
    );
    const input = await findByLabelText('test');

    // Open the date input components
    await fireEvent.click(input);

    expect(await findByLabelText('Su Nov 01 2020')).toBeInTheDocument();
    const prev = await findByLabelText('Go to previous page');

    // Go to October
    await prev.click(input);
    expect(await findByLabelText('Th Oct 01 2020')).toBeInTheDocument();
    const next = await findByLabelText('Go to next page');

    // Go to December
    await next.click(input);
    await next.click(input);
    expect(await findByLabelText('We Dec 02 2020')).toBeInTheDocument();
  });

  it('allows selecting a date with time options', async () => {
    const mock = jest.fn();
    const { findByLabelText, container } = await renderWithTheme(
      <DateInput label="test" date={date.toDate()} withTime onChangeDate={mock} />
    );
    const input = await findByLabelText('test');

    // Open the date input components
    await fireEvent.click(input);
    expect(container).toMatchSnapshot();
  });

  it('allows passing a custom format', async () => {
    const mock = jest.fn();
    const { container } = await renderWithTheme(
      <DateInput label="test" format="M MMM YYYY D dd" date={date.toDate()} onChangeDate={mock} />
    );
    expect(container).toMatchSnapshot();
  });

  it('allows selecting a date', async () => {
    const mock = jest.fn();
    const { findByLabelText, findByText } = await renderWithTheme(
      <DateInput label="test" date={date.toDate()} onChangeDate={mock} />
    );
    const input = await findByLabelText('test');

    // Open the date input components
    await fireEvent.click(input);

    expect(await findByLabelText('Su Nov 01 2020')).toBeInTheDocument();
    const cell = await findByLabelText('Su Nov 01 2020');
    const submitBtn = await findByText('Apply');

    await fireEvent.click(cell);
    await fireEvent.click(submitBtn);

    expect(mock).toHaveBeenCalled();
  });
});
