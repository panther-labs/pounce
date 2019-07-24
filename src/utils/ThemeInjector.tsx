import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'themes/default';
import GlobalStyles from 'utils/GlobalStyles';

const ThemeInjector: React.FC<{ children: ReactElement }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />
      {children}
    </React.Fragment>
  </ThemeProvider>
);

export default ThemeInjector;
