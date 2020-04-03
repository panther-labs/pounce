import { Theme as StyledSystemTheme } from 'styled-system';
import * as CSS from 'csstype';
import colors from './colors';
import typography from './typography';
import icons from './icons';

type radii = 'none' | 'small' | 'medium' | 'large' | 'circle';
type fontFamilies = 'primary';
type shadows = 'none' | 'dark50' | 'dark100' | 'dark150' | 'dark200' | 'dark250';

export interface Theme extends StyledSystemTheme {
  fontSizes: CSS.FontSizeProperty<number>[];
  lineHeights: CSS.LineHeightProperty<string | number>[];
  space: CSS.MarginProperty<number | string>[];
  fontWeights: typeof typography['fontWeights'];
  letterSpacings: typeof typography['letterSpacings'];
  fonts: { [key in fontFamilies]: string };
  colors: typeof colors;
  radii: { [key in radii]: number };
  shadows: { [key in shadows]: CSS.BoxShadowProperty };
  icons: Record<string, { path: JSX.Element; viewBox?: string }>;
}

const theme: Theme = {
  breakpoints: ['1200px'],
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
  radii: {
    none: 0,
    small: 2,
    medium: 4,
    large: 40,
    circle: 99999,
  },
  colors,
  shadows: {
    none: 'none',
    dark50: '0px 2px 8px rgba(0, 0, 0, 0.05)',
    dark100: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    dark150: '0px 1px 6px rgba(0, 0, 0, 0.15)',
    dark200: '0px 2px 16px rgba(0, 0, 0, 0.20)',
    dark250: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  },
  ...typography,
  icons,
};

export default theme;
