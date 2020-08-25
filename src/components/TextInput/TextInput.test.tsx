import React from 'react';
import { renderWithTheme } from 'test-utils';
import TextInput from './index';

it('renders', async () => {
  const { container } = await renderWithTheme(<TextInput label="Text input" />);
  expect(container).toMatchSnapshot();
});

it('renders with disabled option', async () => {
  const { container } = await renderWithTheme(<TextInput label="Text input disabled" disabled />);
  expect(container).toMatchSnapshot();
});

it('renders with invalid option', async () => {
  const { container } = await renderWithTheme(<TextInput label="Text input invalid" invalid />);
  expect(container).toMatchSnapshot();
});

it('renders with required option', async () => {
  const { container } = await renderWithTheme(<TextInput label="Text input required" required />);
  expect(container).toMatchSnapshot();
});

it('renders with icons', async () => {
  const { container } = await renderWithTheme(
    <>
      <TextInput label="Text input wrench" icon="wrench" />
      <TextInput label="Text input calendar" icon="calendar" />
      <TextInput label="Text input caret" icon="caret-down" />
    </>
  );
  expect(container).toMatchSnapshot();
});
