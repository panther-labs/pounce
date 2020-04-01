import React from 'react';
import { ThemeContext } from '@emotion/react';
import { Theme } from 'themes/default';

/**
 * A React hook that allows to retrieve the theme within a functional component
 */
export default () => React.useContext(ThemeContext as React.Context<Theme>);
