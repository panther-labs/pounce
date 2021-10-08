import { Theme as StyledSystemTheme } from 'styled-system';
import * as CSS from 'csstype';
import colors from './colors';
import typography from './typography';
import icons from './icons';

type radii = 'none' | 'small' | 'medium' | 'large' | 'pill' | 'circle';
type fontFamilies = 'primary' | 'mono';
type shadows = 'none' | 'dark50' | 'dark100' | 'dark150' | 'dark200' | 'dark250' | 'dark300';

// Override this in a local declaration to provide custom icon keys
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomIcons {}

// The default icons that pounce ships with
type PounceIcons = typeof icons;

export interface Theme extends StyledSystemTheme {
  fontSizes: typeof typography['fontSizes'];
  lineHeights: typeof typography['lineHeights'];
  space: CSS.Property.Margin<number | string>[];
  fontWeights: typeof typography['fontWeights'];
  letterSpacings: typeof typography['letterSpacings'];
  fonts: { [key in fontFamilies]: string };
  colors: typeof colors;
  radii: { [key in radii]: number };
  shadows: { [key in shadows]: CSS.Property.BoxShadow };
  icons: Record<keyof (PounceIcons & CustomIcons), { path: JSX.Element; viewBox?: string }>;
}

export const theme: Theme = {
  breakpoints: ['769px', '1366px'],
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 64, 72],
  radii: {
    none: 0,
    small: 2,
    medium: 4,
    large: 6,
    pill: 40,
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
    dark300: '0px 0px 15px 0px rgba(21, 23, 26, 0.5)',
  },
  ...typography,
  icons,
};
