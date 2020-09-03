import React from 'react';
import { renderWithTheme, fireEvent } from 'test-utils';
import dayjs from 'dayjs';
import Month from './Month';

const month = 10;
const year = 2020;
const day = 1;
const date = dayjs().date(day).month(month).year(year);

describe('Month', () => {
  it('renders', async () => {
    const { container } = await renderWithTheme(<Month month={month} year={year} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with a selected day', async () => {
    const { container } = await renderWithTheme(
      <Month daySelected={date} month={month} year={year} />
    );
    expect(container).toMatchSnapshot();
  });

  it('allows selecting a date', async () => {
    const mock = jest.fn();
    const { findByLabelText } = await renderWithTheme(
      <Month daySelected={date} month={month} year={year} onDaySelect={mock} />
    );
    const cell = await findByLabelText('Su Nov 01 2020');
    const btn = cell.querySelector('button');
    await fireEvent.click(btn);
    expect(mock).toHaveBeenCalled();
    const day = mock.mock.calls[0][0];
    expect(day.format('DD/MM/YYYY')).toBe('01/11/2020');
  });
});
