import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { theme as defaultTheme, Theme } from '../theme';
import GlobalStyles from './GlobalStyles';

interface ThemeProviderProps {
  /** The theme to pass down to the library components */
  theme?: Theme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => (
  <EmotionThemeProvider theme={theme || defaultTheme}>
    <React.Fragment>
      <GlobalStyles />
      {children}
    </React.Fragment>
  </EmotionThemeProvider>
);

export default ThemeProvider;
