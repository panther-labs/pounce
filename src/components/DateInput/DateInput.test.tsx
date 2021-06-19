import React from 'react';
import { renderWithTheme, fireEvent, waitForElementToBeRemoved, waitFor, within } from 'test-utils';
import mockDate from 'mockdate';
import dayjs from 'dayjs';
import DateInput from './DateInput';

const month = 10;
const year = 2020;
const day = 1;
const date = dayjs().date(day).month(month).year(year).hour(1).minute(2);

beforeEach(() => {
  mockDate.set(new Date('September 16, 2020 15:00:00'));
});

afterEach(() => {
  mockDate.reset();
});

describe('DateInput', () => {
  it('renders', async () => {
    const mock = jest.fn();
    const { container } = await renderWithTheme(
      <DateInput label="test" value={date.toDate()} onChange={mock} />
    );
    expect(container).toMatchSnapshot();
  });

  it('can be solid', async () => {
    const mock = jest.fn();
    const { container } = await renderWithTheme(
      <DateInput variant="solid" label="test" value={date.toDate()} onChange={mock} />
    );
    expect(container).toMatchSnapshot();
  });

  it('opens the month picker', async () => {
    const mock = jest.fn();
    const { findByLabelText, container } = await renderWithTheme(
      <DateInput label="test" value={date.toDate()} onChange={mock} />
    );
    const input = await findByLabelText('test');
    await fireEvent.click(input);
    expect(container).toMatchSnapshot();
  });

  it('opens the month picker with alignment', async () => {
    const mock = jest.fn();
    const { findByLabelText, container } = await renderWithTheme(
      <DateInput label="test" alignment="right" value={date.toDate()} onChange={mock} />
    );
    const input = await findByLabelText('test');
    await fireEvent.click(input);
    expect(container).toMatchSnapshot();
  });

  it('allows browsing through months', async () => {
    const mock = jest.fn();
    const { findByLabelText } = await renderWithTheme(
      <DateInput label="test" value={date.toDate()} onChange={mock} />
    );
    const input = await findByLabelText('test');

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
      <DateInput label="test" value={date.toDate()} withTime onChange={mock} />
    );
    const input = await findByLabelText('test');

    // Open the date input components
    await fireEvent.click(input);
    expect(container).toMatchSnapshot();
  });

  it('allows selecting a date with time options in 24h mode', async () => {
    const mock = jest.fn();
    const { findByLabelText, container } = await renderWithTheme(
      <DateInput label="test" mode="24h" value={date.toDate()} withTime onChange={mock} />
    );
    const input = await findByLabelText('test');

    // Open the date input components
    await fireEvent.click(input);
    expect(container).toMatchSnapshot();
  });

  it('allows selecting a date with time options in 12h mode', async () => {
    const mock = jest.fn();
    const { findByLabelText, container } = await renderWithTheme(
      <DateInput label="test" mode="12h" value={date.toDate()} withTime onChange={mock} />
    );
    const input = await findByLabelText('test');

    // Open the date input components
    await fireEvent.click(input);
    expect(container).toMatchSnapshot();
  });

  it('allows passing a custom format', async () => {
    const mock = jest.fn();
    const { container } = await renderWithTheme(
      <DateInput label="test" format="M MMM YYYY D dd" value={date.toDate()} onChange={mock} />
    );
    expect(container).toMatchSnapshot();
  });

  it('allows selecting a date', async () => {
    const mock = jest.fn();
    const utcDate = dayjs('2020-11-02T00:00:00.000Z').utc();
    const { findByLabelText, getByLabelText, findByText } = await renderWithTheme(
      <DateInput label="test" timezone="utc" value={utcDate.toDate()} onChange={mock} />
    );
    const input = await findByLabelText('test');
    await fireEvent.click(input);

    expect(await findByLabelText('Tu Nov 03 2020')).toBeInTheDocument();

    const cell = within(await getByLabelText('Tu Nov 03 2020')).getByRole('button');
    const submitBtn = await findByText('Apply');

    await waitFor(() => expect(submitBtn).toHaveAttribute('disabled'));

    await fireEvent.click(cell);
    await waitFor(() => expect(submitBtn).not.toHaveAttribute('disabled'));

    await fireEvent.click(submitBtn);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenLastCalledWith(dayjs('2020-11-03T00:00:00.000Z').utc().toDate());
  });

  it('allows clearing', async () => {
    const mock = jest.fn();
    const { findByLabelText, findByText } = await renderWithTheme(
      <DateInput label="test" value={date.toDate()} onChange={mock} />
    );
    const input = await findByLabelText('test');

    // Open the date input components
    await fireEvent.click(input);

    expect(await findByLabelText('Su Nov 01 2020')).toBeInTheDocument();
    const submitBtn = await findByText('Apply');
    const clear = await findByText('Clear Date');

    await waitFor(() => expect(submitBtn).toHaveAttribute('disabled'));
    await fireEvent.click(clear);
    await waitFor(() => expect(submitBtn).not.toHaveAttribute('disabled'));

    await fireEvent.click(submitBtn);

    expect(mock).toHaveBeenLastCalledWith(undefined);
  });

  it('allows selecting date and time with utc timezone', async () => {
    const mock = jest.fn();
    const utcDate = dayjs('2020-11-03T12:00:00.000Z').utc();
    const {
      findByLabelText,
      findByText,
      getAllByRole,
      getByRole,
      getByLabelText,
    } = await renderWithTheme(
      <DateInput label="test" timezone="utc" withTime value={utcDate.toDate()} onChange={mock} />
    );
    const input = await findByLabelText('test');

    // Open the date input components
    await fireEvent.click(input);

    expect(await findByLabelText('Su Nov 01 2020')).toBeInTheDocument();
    const cell = await findByLabelText('Su Nov 01 2020');
    // Change the end date to NOV-21-2020
    const novTwentyFirst = getAllByRole('button', { name: /21/i })[0];
    fireEvent.click(novTwentyFirst);
    // Change hour to 14H
    const hours = await getByLabelText('Time Hours', { selector: 'input' });
    await fireEvent.focus(hours);
    const two = getByRole('option', { name: /14/i });
    await fireEvent.click(two);
    // Change minutes to 20M
    const minutes = await getByLabelText('Time Minutes', { selector: 'input' });
    await fireEvent.focus(minutes);
    const twenty = getByRole('option', { name: /20/i });
    await fireEvent.click(twenty);
    const submitBtn = await findByText('Apply');

    await fireEvent.click(cell);
    await fireEvent.click(submitBtn);

    expect(mock).toHaveBeenCalledWith(
      utcDate.date(21).hour(14).minute(20).startOf('minute').toDate()
    );
  });

  it('closes when a selection is applied', async () => {
    const mock = jest.fn();
    const { getByLabelText, findByText } = await renderWithTheme(
      <DateInput label="test" value={date.toDate()} onChange={mock} />
    );

    // Open the date input components
    fireEvent.click(getByLabelText('test'));

    const dateHeader = await findByText('November 2020');
    expect(dateHeader).toBeInTheDocument();
    const cell = within(await getByLabelText('Tu Nov 03 2020')).getByRole('button');
    fireEvent.click(cell);
    const submitBtn = await findByText('Apply');
    await waitFor(() => expect(submitBtn).not.toHaveAttribute('disabled'));

    fireEvent.click(submitBtn);

    await waitForElementToBeRemoved(dateHeader);
    expect(dateHeader).not.toBeInTheDocument();
  });

  it('closes on an outside click', async () => {
    const mock = jest.fn();
    const { container, findByLabelText, findByText } = await renderWithTheme(
      <DateInput label="test" value={new Date()} onChange={mock} />
    );

    // Open the date input components
    fireEvent.click(await findByLabelText('test'));

    const dateHeader = await findByText('September 2020');
    expect(dateHeader).toBeInTheDocument();

    fireEvent.mouseDown(container);

    await waitForElementToBeRemoved(dateHeader);
    expect(dateHeader).not.toBeInTheDocument();
  });

  it('toggles when the calendar icon is clicked', async () => {
    const mock = jest.fn();
    const { container, findByText } = await renderWithTheme(
      <DateInput label="test" value={new Date()} onChange={mock} />
    );
    const calendarIconButton = container.querySelector(
      '[aria-label="Toggle picker"]'
    ) as HTMLButtonElement;

    // Open the date input components
    fireEvent.click(calendarIconButton);

    const dateHeader = await findByText('September 2020');
    expect(dateHeader).toBeInTheDocument();

    fireEvent.click(calendarIconButton);

    await waitForElementToBeRemoved(dateHeader);
    expect(dateHeader).not.toBeInTheDocument();
  });

  it('updates when the `value` prop updates externally', async () => {
    const mock = jest.fn();
    const value = new Date();
    const valueInDayjs = dayjs(value);

    const { getByLabelText, rerender } = await renderWithTheme(
      <DateInput label="test" value={value} onChange={mock} />
    );

    const input = getByLabelText('test');
    expect(input).toHaveValue(valueInDayjs.format('MM/DD/YYYY'));

    const newValueInDayjs = valueInDayjs.add(2, 'minutes');
    const newValue = newValueInDayjs.toDate();

    rerender(<DateInput label="test" value={newValue} onChange={mock} />);

    expect(input).toHaveValue(newValueInDayjs.format('MM/DD/YYYY'));
  });
});
