import React from 'react';
import { renderWithTheme } from 'test-utils';
import DoubleTextInput from './index';

const props = {
  labelFrom: 'Name',
  labelTo: 'Surname',
};

it('renders', async () => {
  const { container } = await renderWithTheme(<DoubleTextInput {...props} />);
  expect(container).toMatchSnapshot();
});

it('renders with disabled option', async () => {
  const { container } = await renderWithTheme(<DoubleTextInput {...props} disabled />);
  expect(container).toMatchSnapshot();
});

it('renders with invalid option', async () => {
  const { container } = await renderWithTheme(<DoubleTextInput {...props} invalid />);
  expect(container).toMatchSnapshot();
});

it('renders with required option', async () => {
  const { container } = await renderWithTheme(<DoubleTextInput {...props} required />);
  expect(container).toMatchSnapshot();
});

it('renders with icons', async () => {
  const { container } = await renderWithTheme(
    <>
      <DoubleTextInput {...props} icon="wrench" />
      <DoubleTextInput {...props} icon="calendar" />
      <DoubleTextInput {...props} icon="caret-down" />
    </>
  );
  expect(container).toMatchSnapshot();
});
