import React from 'react';
import { renderWithTheme } from 'test-utils';
import Textarea from './index';

it('renders', async () => {
  const { container } = await renderWithTheme(<Textarea label="Text input" />);
  expect(container).toMatchSnapshot();
});

it('renders a solid textarea', async () => {
  const { container } = await renderWithTheme(<Textarea variant="solid" label="Text input" />);
  expect(container).toMatchSnapshot();
});

it('can be invalid', async () => {
  const { container } = await renderWithTheme(<Textarea invalid label="Text input" />);
  expect(container).toMatchSnapshot();
});

it('can be required', async () => {
  const { container } = await renderWithTheme(<Textarea required label="Text input" />);
  expect(container).toMatchSnapshot();
});

it('can be disabled', async () => {
  const { container } = await renderWithTheme(<Textarea disabled label="Text input" />);
  expect(container).toMatchSnapshot();
});
