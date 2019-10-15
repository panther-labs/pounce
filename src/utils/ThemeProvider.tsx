import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import defaultTheme, { Theme } from 'themes/default';
import GlobalStyles from 'utils/GlobalStyles';

interface ThemeProviderProps {
  /** The theme to pass down to the library components */
  theme?: Theme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => (
  <EmotionThemeProvider<typeof theme> theme={theme || defaultTheme}>
    <React.Fragment>
      <GlobalStyles />
      {children}
    </React.Fragment>
  </EmotionThemeProvider>
);

export default ThemeProvider;
