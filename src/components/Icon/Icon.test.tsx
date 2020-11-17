import React from 'react';
import { renderWithTheme } from 'test-utils';
import Icon from './index';

describe('Icon', () => {
  it('renders `size` correctly', () => {
    const { container } = renderWithTheme(
      <>
        <Icon size="x-small" type="brackets" aria-label="Test brackets" />
        <Icon size="small" type="add" aria-label="Test" />
        <Icon size="medium" type="arrow-up" aria-label="Test arrow" />
        <Icon size="large" type="timer" aria-label="Test timer" />
      </>
    );

    expect(container).toMatchSnapshot();
  });
  it('renders `color` correctly', () => {
    const { container } = renderWithTheme(
      <>
        <Icon color="blue-100" type="brackets" aria-label="Test brackets" />
        <Icon color="cyan-500" type="add" aria-label="Test" />
      </>
    );

    expect(container).toMatchSnapshot();
  });
});
