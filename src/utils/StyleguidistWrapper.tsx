import React from 'react';
import Flex from 'components/Flex';
import ThemeProvider from './ThemeProvider';

const StyleguidistWrapper: React.FC = ({ children }) => (
  <ThemeProvider>
    <Flex>{children}</Flex>
  </ThemeProvider>
);

export default StyleguidistWrapper;
