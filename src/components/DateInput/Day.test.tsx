import React from 'react';
import { renderWithTheme, fireEvent } from 'test-utils';
import dayjs from 'dayjs';
import Day from './Day';

const month = 10;
const year = 2020;
const day = 1;
const date = dayjs().date(day).month(month).year(year);
const endDate = date.add(1, 'month');

describe('Day', () => {
  it('renders a disabled cell', async () => {
    const { container } = await renderWithTheme(<Day month={month} year={year} />);
    expect(container).toMatchSnapshot();
  });

  it('renders a cell when date is present', async () => {
    const { container } = await renderWithTheme(<Day day={day} month={month} year={year} />);
    expect(container).toMatchSnapshot();
  });

  it('renders a cell selected', async () => {
    const { container } = await renderWithTheme(
      <Day daysSelected={[date]} day={day} month={month} year={year} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders a selected date', async () => {
    const { container } = await renderWithTheme(
      <Day daysSelected={[date, endDate]} day={day} month={month} year={year} />
    );
    expect(container).toMatchSnapshot();
  });

  it('allows selecting a date', async () => {
    const mock = jest.fn();
    const { findByLabelText } = await renderWithTheme(
      <Day day={day} month={month} year={year} onDaySelect={mock} />
    );
    const cell = await findByLabelText('Su Nov 01 2020');
    const btn = cell.querySelector('button');
    await fireEvent.click(btn);
    expect(mock).toHaveBeenCalled();
    const date = mock.mock.calls[0][0];
    expect(date.format('DD/MM/YYYY')).toBe('01/11/2020');
  });
});
