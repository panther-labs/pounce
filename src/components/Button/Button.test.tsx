import React from 'react';
import { renderWithTheme } from 'test-utils';
import Button from './index';

describe('Button', () => {
  it('renders `small` size correctly', () => {
    const { container } = renderWithTheme(<Button size="small">Test</Button>);

    expect(container).toMatchSnapshot();
  });

  it('renders `medium` size correctly', () => {
    const { container } = renderWithTheme(<Button size="medium">Test</Button>);

    expect(container).toMatchSnapshot();
  });

  it('renders `large` size correctly', () => {
    const { container } = renderWithTheme(<Button size="large">Test</Button>);

    expect(container).toMatchSnapshot();
  });
});
