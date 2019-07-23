import { Theme as StyledSystemTheme } from 'styled-system';

type fontWeights = 'normal' | 'bold' | 'bolder';
type radii = 'none' | 'small' | 'medium' | 'large' | 'circle';
type fontFamilies = 'primary';
type colors =
  | 'transparent'
  | 'white'
  | 'grey50'
  | 'grey100'
  | 'grey200'
  | 'grey300'
  | 'grey400'
  | 'grey500'
  | 'black'
  | 'red100'
  | 'red200'
  | 'red300'
  | 'orange300'
  | 'yellow300'
  | 'green100'
  | 'green200'
  | 'green300'
  | 'blue100'
  | 'blue200'
  | 'blue300'
  | 'primary50'
  | 'primary100'
  | 'primary200'
  | 'primary300';

export interface Theme extends StyledSystemTheme {
  fontWeights: { [key in fontWeights]: number };
  radii: { [key in radii]: number };
  fonts: { [key in fontFamilies]: string };
  colors: { [key in colors]: string };
}

const theme: Theme = {
  breakpoints: ['1200px'],
  fontSizes: [10, 12, 14, 16, 24, 40],
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36],
  fontWeights: { normal: 400, bold: 500, bolder: 700 },
  fonts: {
    primary: 'Roboto, system-ui, sans-serif',
  },
  radii: {
    none: 0,
    small: 2,
    medium: 4,
    large: 40,
    circle: 99999,
  },
  colors: {
    transparent: 'rgba(0,0,0,0)',

    white: '#ffffff',

    grey50: '#f6f6f6',
    grey100: '#e0e0e0',
    grey200: '#bdbdbd',
    grey300: '#828282',
    grey400: '#4f4f4f',
    grey500: '#333333',

    black: '#000000',

    red100: '#FDCDCD',
    red200: '#FF9898',
    red300: '#EB5757',

    orange300: '#F2994A',

    yellow300: '#F2C94C',

    green100: '#A2E9BF',
    green200: '#6FCF97',
    green300: '#27AE60',

    blue100: '#A9CEFF',
    blue200: '#71ADFE',
    blue300: '#2F80ED',

    primary50: '#E2E1FF',
    primary100: '#BFBEFF',
    primary200: '#918FFF',
    primary300: '#6967F4',
  },
  lineHeights: ['normal'],
  letterSpacings: ['normal'],
  shadows: [
    'none',
    '0px 2px 8px rgba(0, 0, 0, 0.05)',
    '0px 1px 6px rgba(0, 0, 0, 0.15)',
    '0px 2px 16px rgba(0, 0, 0, 0.20)',
  ],
};

export default theme;
