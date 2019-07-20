import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'themes/default';

const ThemeInjector: React.FC<{ children: ReactElement }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeInjector;
