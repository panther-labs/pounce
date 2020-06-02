import React from 'react';
import Flex from '../components/Flex';
import ThemeProvider from './ThemeProvider';

const StyleguidistWrapper: React.FC = ({ children }) => (
  <ThemeProvider>
    <Flex width="100%" backgroundColor="navyblue-800" p={5}>
      {children}
    </Flex>
  </ThemeProvider>
);

export default StyleguidistWrapper;
