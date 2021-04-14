import React from 'react';
import { renderWithTheme, fireEvent, waitForElementToBeRemoved } from 'test-utils';
import mockDate from 'mockdate';
import dayjs from 'dayjs';
import DateRangeInput from './DateRangeInput';

const month = 10;
const year = 2020;
const day = 1;
const start = dayjs().date(day).month(month).year(year).hour(1).minute(2);
const end = start.add(10, 'day');

beforeEach(() => {
  mockDate.set(new Date('September 16, 2020 15:00:00'));
});

afterEach(() => {
  mockDate.reset();
});

const props = {
  id: 'test',
  labelStart: 'From date',
  labelEnd: 'To date',
  value: [start.toDate(), end.toDate()] as [Date, Date],
};

describe('DateRangeInput', () => {
  it('renders', async () => {
    const mock = jest.fn();
    const { container } = await renderWithTheme(<DateRangeInput {...props} onChange={mock} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with solid coloring', async () => {
    const mock = jest.fn();
    const { container } = await renderWithTheme(
      <DateRangeInput {...props} variant="solid" onChange={mock} />
    );
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

  it('opens the month picker with placement', async () => {
    const mock = jest.fn();
    const { findByLabelText, container } = await renderWithTheme(
      <DateRangeInput {...props} alignment="right" onChange={mock} />
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
    const { findByLabelText } = await renderWithTheme(
      <DateRangeInput {...props} onChange={mock} />
    );
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
      getByRole,
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
    const sixOhClock = getByRole('option', { name: /16/i });
    await fireEvent.click(sixOhClock);

    await fireEvent.focus(endingMinutes);
    const fiftyMinutes = getByRole('option', { name: /50/i });
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

    const { findByLabelText, getByLabelText, findByText, getByRole } = await renderWithTheme(
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
    const sevenOhClock = getByRole('option', { name: /07/i });
    await fireEvent.click(sevenOhClock);

    await fireEvent.focus(endingMinutes);
    const twentyTwoMinutes = getByRole('option', { name: /22/i });
    await fireEvent.click(twentyTwoMinutes);

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

  it('allows changing time options in 24h mode', async () => {
    const mock = jest.fn();
    const endDate = end.add(3, 'hour').minute(59);

    const { findByLabelText, getByLabelText, findByText, getByRole } = await renderWithTheme(
      <DateRangeInput
        value={[start.toDate(), endDate.toDate()]}
        id="test-hours"
        mode="24h"
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

    await fireEvent.focus(endingHours);
    const twelve = getByRole('option', { name: /00/i });
    await fireEvent.click(twelve);

    await fireEvent.focus(endingMinutes);
    const fiftyMinutes = getByRole('option', { name: /22/i });

    await fireEvent.click(fiftyMinutes);

    const submitBtn = await findByText('Apply');
    await fireEvent.click(submitBtn);
    expect(mock).toHaveBeenCalled();

    const starting = dayjs(mock.mock.calls[0][0][0]);
    const ending = dayjs(mock.mock.calls[0][0][1]);

    // Format and assert dates without timezones in order to make it work
    // across workstations and the CI
    expect(starting.format('DD/MM/YYYY HH:mm A')).toBe('01/11/2020 01:02 AM');
    expect(ending.format('DD/MM/YYYY HH:mm A')).toBe('11/11/2020 00:22 AM');
  });

  it('is disabled when start date is after end date', async () => {
    const mock = jest.fn();
    const endDate = start.add(3, 'hour').minute(59);

    const {
      findByLabelText,
      getAllByRole,
      findByText,
      getByLabelText,
      getByRole,
    } = await renderWithTheme(
      <DateRangeInput
        value={[start.toDate(), endDate.toDate()]}
        id="test-hours"
        mode="24h"
        labelStart="From date"
        labelEnd="To date"
        withTime={true}
        onChange={mock}
      />
    );
    // Open the date input components
    const input = await findByLabelText('From date');
    await fireEvent.click(input);

    const submitBtn = await findByText('Apply');
    // Apply button is enabled as long as end date is after start date
    expect(submitBtn).not.toHaveAttribute('disabled');

    // Set start date later than end date
    const novFirst = getAllByRole('button', { name: /1/i })[0];
    fireEvent.click(novFirst);

    const startHours = await getByLabelText('From Time Hours', { selector: 'input' });
    const startMinutes = await getByLabelText('From Time Minutes', { selector: 'input' });

    await fireEvent.focus(startHours);
    const one = getByRole('option', { name: /12/i });

    await fireEvent.click(one);

    await fireEvent.focus(startMinutes);
    const fourtyMinutes = getByRole('option', { name: /40/i });
    await fireEvent.click(fourtyMinutes);
    expect(submitBtn).toHaveAttribute('disabled');
  });

  it('rounds start and end dates by minute', async () => {
    const mock = jest.fn();
    const endDate = end.add(3, 'hour').minute(59);

    const { findByLabelText, getByLabelText, findByText, getByRole } = await renderWithTheme(
      <DateRangeInput
        value={[start.toDate(), endDate.toDate()]}
        id="test-hours"
        mode="24h"
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

    await fireEvent.focus(endingHours);
    const twelve = getByRole('option', { name: /12/i });
    await fireEvent.click(twelve);

    await fireEvent.focus(endingMinutes);
    const thirtyMinutes = getByRole('option', { name: /30/i });
    await fireEvent.click(thirtyMinutes);

    const submitBtn = await findByText('Apply');
    await fireEvent.click(submitBtn);
    expect(mock).toHaveBeenCalledWith([
      start.startOf('minute').toDate(),
      endDate.hour(12).minute(30).endOf('minute').toDate(),
    ]);
  });

  it('rounds start and end dates by day', async () => {
    const mock = jest.fn();
    const endDate = end.add(3, 'hour').minute(59);

    const { findByLabelText, getAllByRole, findByText } = await renderWithTheme(
      <DateRangeInput
        value={[start.toDate(), endDate.toDate()]}
        id="test-hours"
        mode="24h"
        labelStart="From date"
        labelEnd="To date"
        withTime={false}
        onChange={mock}
      />
    );
    const input = await findByLabelText('From date');
    // Open the date input components
    await fireEvent.click(input);
    const novTwentyFirst = getAllByRole('button', { name: /21/i })[0];
    fireEvent.click(novTwentyFirst);
    const submitBtn = await findByText('Apply');
    await fireEvent.click(submitBtn);
    expect(mock).toHaveBeenCalledWith([
      start.startOf('day').toDate(),
      endDate.date(21).endOf('day').toDate(),
    ]);
  });

  it('allows selecting dates with utc timezone', async () => {
    const mock = jest.fn();
    const startDate = dayjs('2020-10-03T12:00:00.000Z');
    const endDate = dayjs('2020-10-12T15:00:00.000Z');

    const {
      findByLabelText,
      getAllByRole,
      findByText,
      getByLabelText,
      getByRole,
    } = await renderWithTheme(
      <DateRangeInput
        value={[startDate.toDate(), endDate.toDate()]}
        id="test-hours"
        mode="24h"
        labelStart="From date"
        timezone="utc"
        labelEnd="To date"
        withTime={true}
        onChange={mock}
      />
    );
    const input = await findByLabelText('From date');
    // Open the date input components
    await fireEvent.click(input);
    // Change the end date to NOV-21-2020
    const novTwentyFirst = getAllByRole('button', { name: /21/i })[0];
    fireEvent.click(novTwentyFirst);
    const endingHours = await getByLabelText('To Time Hours', { selector: 'input' });
    const endingMinutes = await getByLabelText('To Time Minutes', { selector: 'input' });

    // Change hour to 14H
    await fireEvent.focus(endingHours);
    const two = getByRole('option', { name: /14/i });
    await fireEvent.click(two);
    // Change minutes to 20M
    await fireEvent.focus(endingMinutes);
    const twenty = getByRole('option', { name: /20/i });
    await fireEvent.click(twenty);
    const submitBtn = await findByText('Apply');
    await fireEvent.click(submitBtn);
    expect(mock).toHaveBeenCalledWith([
      startDate.utc().startOf('minute').toDate(),
      endDate.utc().date(21).hour(14).minute(20).endOf('minute').toDate(),
    ]);
  });

  it('selects a preset when using utc', async () => {
    const mock = jest.fn();
    const { findByLabelText, findByText } = await renderWithTheme(
      <DateRangeInput {...props} value={[]} timezone="utc" onChange={mock} withPresets />
    );
    const input = await findByLabelText('From date');

    // Open the date input components
    await fireEvent.click(input);

    const preset = await findByLabelText('Last 3 Months');
    const submitBtn = await findByText('Apply');

    await fireEvent.click(preset);
    await fireEvent.click(submitBtn);

    expect(mock).toHaveBeenCalled();
    // Since the presets are dynamic and based on the current date we need to ensure
    // that the appropriate range is selected
    const start = dayjs(mock.mock.calls[0][0][0]);
    const end = dayjs(mock.mock.calls[0][0][1]);

    // Seven days including the last whole day( because time picker is disabled)
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const sevenDaysInMillis = oneDayInMillis * 92 + (oneDayInMillis - 1);
    expect(start.isBefore(end)).toBe(true);
    expect(end.diff(start)).toBe(sevenDaysInMillis);
    expect(start.toISOString()).toEqual(dayjs().utc().add(-92, 'day').startOf('day').toISOString());
    expect(end.toISOString()).toEqual(dayjs().utc().endOf('day').toISOString());
  });

  it('selects a preset when using utc and time picker is enabled', async () => {
    const mock = jest.fn();
    const { findByLabelText, findByText } = await renderWithTheme(
      <DateRangeInput
        {...props}
        value={[]}
        timezone="utc"
        withTime={true}
        onChange={mock}
        withPresets
      />
    );
    const input = await findByLabelText('From date');

    // Open the date input components
    await fireEvent.click(input);

    const preset = await findByLabelText('Last Week');
    const submitBtn = await findByText('Apply');

    await fireEvent.click(preset);
    await fireEvent.click(submitBtn);

    expect(mock).toHaveBeenCalled();
    // Since the presets are dynamic and based on the current date we need to ensure
    // that the appropriate range is selected
    const start = dayjs(mock.mock.calls[0][0][0]);
    const end = dayjs(mock.mock.calls[0][0][1]);

    // Seven days including the last whole minute( because time picker is enabled)
    const sevenDaysInMillis = 24 * 60 * 60 * 1000 * 7 + (1000 * 60 - 1);
    expect(start.isBefore(end)).toBe(true);
    expect(end.diff(start)).toBe(sevenDaysInMillis);
    expect(start.toISOString()).toEqual(dayjs().utc().add(-7, 'day').toISOString());
    expect(end.toISOString()).toEqual(dayjs().utc().endOf('minute').toISOString());
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

    expect(start.isBefore(end)).toBe(true);
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

  it('allows clearing the selection when `withTime` is applied', async () => {
    const mock = jest.fn();
    const { findByLabelText, findByText } = await renderWithTheme(
      <DateRangeInput {...props} withTime onChange={mock} />
    );

    const input = await findByLabelText('From date');
    await fireEvent.click(input);
    expect(await findByLabelText('Su Nov 01 2020')).toBeInTheDocument();
    expect(await findByText('Clear Dates & Time')).toBeInTheDocument();
  });

  it('allows clearing the selection', async () => {
    const mock = jest.fn();
    const { findByLabelText, findByText } = await renderWithTheme(
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

    const clearBtn = await findByText('Clear Dates');
    await fireEvent.click(clearBtn);

    await fireEvent.click(submitBtn);
    expect(mock).toHaveBeenLastCalledWith([undefined, undefined]);
  });

  it('closes on an outside click', async () => {
    const mock = jest.fn();
    const { container, findByLabelText, findByText } = await renderWithTheme(
      <DateRangeInput {...props} onChange={mock} />
    );
    const input = await findByLabelText('From date');

    // Open the date input components
    fireEvent.click(input);

    const dateHeader = await findByText('November 2020');
    expect(dateHeader).toBeInTheDocument();

    fireEvent.mouseDown(container);

    await waitForElementToBeRemoved(dateHeader);
    expect(dateHeader).not.toBeInTheDocument();
  });

  it('closes when a selection is applied', async () => {
    const mock = jest.fn();
    const { findByLabelText, getByText } = await renderWithTheme(
      <DateRangeInput {...props} onChange={mock} />
    );

    // Open the date input components
    fireEvent.click(await findByLabelText('From date'));
    fireEvent.click(await findByLabelText('Su Nov 01 2020'));
    fireEvent.click(await findByLabelText('Mo Nov 30 2020'));

    const dateHeader = getByText('November 2020');
    expect(dateHeader).toBeInTheDocument();

    fireEvent.click(getByText('Apply'));

    await waitForElementToBeRemoved(dateHeader);
    expect(dateHeader).not.toBeInTheDocument();
  });

  it('toggles when the calendar icon is clicked', async () => {
    const mock = jest.fn();
    const { container, findByText } = await renderWithTheme(
      <DateRangeInput {...props} onChange={mock} />
    );
    const calendarIconButton = container.querySelector(
      '[aria-label="Toggle picker"]'
    ) as HTMLButtonElement;

    // Open the date input components
    fireEvent.click(calendarIconButton);

    const dateHeader = await findByText('November 2020');
    expect(dateHeader).toBeInTheDocument();

    fireEvent.click(calendarIconButton);

    await waitForElementToBeRemoved(dateHeader);
    expect(dateHeader).not.toBeInTheDocument();
  });
});
