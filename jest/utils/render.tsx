import React from 'react';
import ThemeProvider from '../../src/utils/ThemeProvider';
import { render as rtlRender, RenderOptions as RtlRenderOptions } from '@testing-library/react';

export const renderWithTheme = (element: React.ReactElement, options: RtlRenderOptions) => {
  return rtlRender(<ThemeProvider>{element}</ThemeProvider>, { ...options });
};
