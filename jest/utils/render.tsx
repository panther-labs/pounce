import React from 'react';
import ThemeProvider from '../../src/utils/ThemeProvider';
import { render as rtlRender, RenderOptions as RtlRenderOptions } from '@testing-library/react';

export const renderWithTheme = (element: React.ReactElement, options: RtlRenderOptions = {}) => {
  const { rerender, ...otherRtlRenderHelpers } = rtlRender(
    <ThemeProvider>{element}</ThemeProvider>,
    { ...options }
  );

  return {
    ...otherRtlRenderHelpers,
    rerender: (updatedElement: React.ReactElement) =>
      rerender(<ThemeProvider>{updatedElement}</ThemeProvider>),
  };
};
