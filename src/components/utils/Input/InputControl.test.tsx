import React from 'react';
import { renderWithTheme } from 'test-utils';
import InputControl from './InputControl';

it('renders', async () => {
  const { container } = await renderWithTheme(<InputControl />);
  expect(container).toMatchSnapshot();
});

it('can be hidden', async () => {
  const { container } = await renderWithTheme(<InputControl hidden />);
  expect(container).toMatchSnapshot();
});

it('can be invalid', async () => {
  const { container } = await renderWithTheme(<InputControl invalid />);
  expect(container).toMatchSnapshot();
});

it('can be disabled', async () => {
  const { container } = await renderWithTheme(<InputControl disabled />);
  expect(container).toMatchSnapshot();
});

it('can be required', async () => {
  const { container } = await renderWithTheme(<InputControl required />);
  expect(container).toMatchSnapshot();
});

it('can be solid', async () => {
  const { container } = await renderWithTheme(<InputControl required />);
  expect(container).toMatchSnapshot();
});
