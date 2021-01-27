import React from 'react';
import { renderWithTheme, fireEvent, waitForElementToBeRemoved } from 'test-utils';
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
    const { findByLabelText, findByText } = await renderWithTheme(
      <DateInput label="test" value={date.toDate()} onChange={mock} />
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

  it('allows selecting date and time with utc timezone', async () => {
    const mock = jest.fn();
    const utcDate = dayjs('2020-11-03T12:00:00.000Z').utc();
    const {
      findByLabelText,
      findByText,
      getAllByRole,
      findByTestId,
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
    const two = await findByTestId('time-hours-14');
    await fireEvent.click(two);
    // Change minutes to 20M
    const minutes = await getByLabelText('Time Minutes', { selector: 'input' });
    await fireEvent.focus(minutes);
    const twenty = await findByTestId('time-minutes-20');
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
    const { getByLabelText, findByLabelText, findByText, getByText } = await renderWithTheme(
      <DateInput label="test" value={date.toDate()} onChange={mock} />
    );

    // Open the date input components
    fireEvent.click(getByLabelText('test'));
    fireEvent.click(await findByLabelText('Su Nov 01 2020'));

    const dateHeader = await findByText('November 2020');
    expect(dateHeader).toBeInTheDocument();

    fireEvent.click(getByText('Apply'));

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
});
