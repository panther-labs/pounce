import React from 'react';
import { renderWithTheme } from 'test-utils';
import TextInput from './index';

it('renders', async () => {
  const { container } = await renderWithTheme(<TextInput label="Text input" />);
  expect(container).toMatchSnapshot();
});

it('renders with different type', async () => {
  const { container } = await renderWithTheme(
    <TextInput label="Num input" type="number" value="0" />
  );
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

it('renders with prefix', async () => {
  const { container, getByText, getByLabelText } = await renderWithTheme(
    <TextInput prefix="Custom" label="Text input" value="Test with Prefix" required />
  );
  const inputWithPrefix = getByLabelText('Text input');
  expect(inputWithPrefix.value).toBe('Test with Prefix');
  expect(getByText('Custom')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

it('renders with suffix', async () => {
  const { container, getByText, getByLabelText } = await renderWithTheme(
    <TextInput suffix="Custom" label="Text input" value="Test with Suffix" required />
  );
  const inputWithPrefix = getByLabelText('Text input');
  expect(inputWithPrefix.value).toBe('Test with Suffix');
  expect(getByText('Custom')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

it('renders with icons', async () => {
  const { container } = await renderWithTheme(
    <>
      <TextInput label="Text input wrench" icon="wrench" />
      <TextInput
        label="Text input calendar"
        icon="calendar"
        iconProps={{ color: 'navyblue-100' }}
      />
      <TextInput
        iconAlignment="left"
        label="Text input with left icon"
        icon="calendar"
        iconProps={{ color: 'navyblue-100' }}
      />
      <TextInput
        label="Text input caret"
        icon="caret-down"
        iconProps={{ color: 'navyblue-300', size: 'x-small' }}
      />
    </>
  );
  expect(container).toMatchSnapshot();
});
