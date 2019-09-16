import React from 'react';
import { ThemeContext } from 'styled-components';
import { Theme } from 'themes/default';

/**
 * A React hook that allows to retrieve the theme within a functional component
 */
const useTheme = () => {
  const theme = React.useContext<Theme>(ThemeContext);
  return theme || {};
};

export default useTheme;
