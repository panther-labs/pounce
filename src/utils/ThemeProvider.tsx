import React from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';
import defaultTheme from 'themes/default';
import GlobalStyles from 'utils/GlobalStyles';

interface ThemeProviderProps {
  /** The theme to pass down to the library components */
  theme?: DefaultTheme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => (
  <StyledThemeProvider theme={theme || defaultTheme}>
    <React.Fragment>
      <GlobalStyles />
      {children}
    </React.Fragment>
  </StyledThemeProvider>
);

export default ThemeProvider;
