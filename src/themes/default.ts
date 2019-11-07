import { Theme as StyledSystemTheme } from 'styled-system';
import * as CSS from 'csstype';

type fontWeights = 'normal' | 'bold' | 'bolder';
type radii = 'none' | 'small' | 'medium' | 'large' | 'circle';
type fontFamilies = 'primary';
type shadows = 'none' | 'dark50' | 'dark100' | 'dark150' | 'dark200' | 'dark250';
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
  | 'red50'
  | 'red100'
  | 'red200'
  | 'red300'
  | 'orange50'
  | 'orange300'
  | 'yellow300'
  | 'green100'
  | 'green200'
  | 'green300'
  | 'blue50'
  | 'blue100'
  | 'blue200'
  | 'blue300'
  | 'primary50'
  | 'primary100'
  | 'primary200'
  | 'primary300';

export interface Theme extends StyledSystemTheme {
  fontSizes: CSS.FontSizeProperty<number>[];
  space: number[];
  fontWeights: { [key in fontWeights]: number };
  fonts: { [key in fontFamilies]: string };
  colors: { [key in colors]: string };
  radii: { [key in radii]: number };
  lineHeights: CSS.LineHeightProperty<{}>[];
  shadows: { [key in shadows]: CSS.BoxShadowProperty };
}

const theme: Theme = {
  breakpoints: ['1200px'],
  fontSizes: [10, 12, 14, 16, 24, 32],
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
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

    red50: '#FFEAEA',
    red100: '#FDCDCD',
    red200: '#FF9898',
    red300: '#EB5757',

    orange50: '#FFF3E9',
    orange300: '#F2994A',

    yellow300: '#F2C94C',

    green100: '#A2E9BF',
    green200: '#6FCF97',
    green300: '#27AE60',

    blue50: '#cee3ff',
    blue100: '#A9CEFF',
    blue200: '#71ADFE',
    blue300: '#2F80ED',

    primary50: '#E2E1FF',
    primary100: '#BFBEFF',
    primary200: '#918FFF',
    primary300: '#6967F4',
  },
  lineHeights: ['14px', '16px', '18px', '20px', '28px', '36px'],
  letterSpacings: ['normal'],
  shadows: {
    none: 'none',
    dark50: '0px 2px 8px rgba(0, 0, 0, 0.05)',
    dark100: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    dark150: '0px 1px 6px rgba(0, 0, 0, 0.15)',
    dark200: '0px 2px 16px rgba(0, 0, 0, 0.20)',
    dark250: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  },
};

export default theme;
