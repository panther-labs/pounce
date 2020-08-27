import React from 'react';
import { renderWithTheme, fireEvent } from 'test-utils';
import dayjs from 'dayjs';
import Day from './Day';

const month = 10;
const year = 2020;
const day = 1;
const date = dayjs().date(day).month(month).year(year);

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
      <Day daySelected={date} day={day} month={month} year={year} />
    );
    expect(container).toMatchSnapshot();
  });

  it('allows selecting a date', async () => {
    const mock = jest.fn();
    const { findByLabelText } = await renderWithTheme(
      <Day day={day} month={month} year={year} onDaySelect={mock} />
    );
    const cell = await findByLabelText('Su Nov 01 2020');
    await fireEvent.click(cell);
    expect(mock).toHaveBeenCalled();
  });
});
