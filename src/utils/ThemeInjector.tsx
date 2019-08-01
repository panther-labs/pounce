import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'themes/default';
import GlobalStyles from 'utils/GlobalStyles';
import Flex from 'components/Flex';

const ThemeInjector: React.FC<{ children: ReactElement }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Flex>
      <GlobalStyles />
      {children}
    </Flex>
  </ThemeProvider>
);

export default ThemeInjector;
