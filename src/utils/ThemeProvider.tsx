import React from 'react';
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';
import Theme from 'themes/default';
import GlobalStyles from 'utils/GlobalStyles';
import Flex from 'components/Flex';

interface ThemeProviderProps {
  /** The theme to pass down to the library components */
  theme?: DefaultTheme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  React.useEffect(() => {
    const materialFontLinkTag = document.createElement('link');
    materialFontLinkTag.rel = 'stylesheet';
    materialFontLinkTag.href = 'https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap'; // prettier-ignore
    document.head.appendChild(materialFontLinkTag);
  }, []);

  return (
    <StyledThemeProvider theme={theme || Theme}>
      <Flex>
        <GlobalStyles />
        {children}
      </Flex>
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
