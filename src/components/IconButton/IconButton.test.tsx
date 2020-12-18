import React from 'react';
import { renderWithTheme } from 'test-utils';
import IconButton from './index';

describe('IconButton', () => {
  it('renders `small` size correctly', () => {
    const { container } = renderWithTheme(<IconButton size="small" icon="add" aria-label="Test" />);

    expect(container).toMatchSnapshot();
  });

  it('renders `medium` size correctly', () => {
    const { container } = renderWithTheme(
      <IconButton size="medium" icon="add" aria-label="Test" />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders `large` size correctly', () => {
    const { container } = renderWithTheme(<IconButton size="large" icon="add" aria-label="Test" />);

    expect(container).toMatchSnapshot();
  });

  it('renders `variantColor`  and `variants` correctly', () => {
    const { container } = renderWithTheme(
      <>
        <IconButton variantColor="teal" variant="solid" size="large" icon="add" aria-label="Test" />
        <IconButton variantColor="red" variant="ghost" icon="brackets" aria-label="Test red" />
        <IconButton variantColor="darkblue" icon="timer" aria-label="Test timer" />
      </>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders `square` variantBorderStyle correctly', () => {
    const { container } = renderWithTheme(
      <IconButton variantBorderStyle="square" icon="add" aria-label="Test" />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders `circle` variantBorderStyle correctly', () => {
    const { container } = renderWithTheme(
      <IconButton variantBorderStyle="circle" icon="add" aria-label="Test" />
    );

    expect(container).toMatchSnapshot();
  });
});
