import React from 'react';
import { ThemeContext, DefaultTheme } from 'styled-components';

/**
 * A React hook that allows to retrieve the theme within a functional component
 */
const useTheme = () => {
  const theme = React.useContext<DefaultTheme>(ThemeContext);
  return theme || {};
};

export default useTheme;
