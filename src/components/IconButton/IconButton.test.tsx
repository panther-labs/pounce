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
        <IconButton
          variantColor="teal-500"
          variant="solid"
          size="large"
          icon="add"
          aria-label="Test"
        />
        <IconButton variantColor="pink-700" variant="ghost" icon="brackets" aria-label="Test red" />
        <IconButton variantColor="navyblue-700" icon="timer" aria-label="Test timer" />
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
