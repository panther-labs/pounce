import 'styled-components';
import { ObjectOrArray, Theme as StyledSystemTheme } from 'styled-system';
import * as CSS from 'csstype';

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

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends StyledSystemTheme {
    fontSizes: CSS.FontSizeProperty<number>[];
    space: number[];
    fontWeights: { [key in fontWeights]: number };
    fonts: { [key in fontFamilies]: string };
    colors: { [key in colors]: string };
    radii: { [key in radii]: number };
    lineHeights: CSS.LineHeightProperty<{}>[];
    shadows: CSS.BoxShadowProperty[];
  }
}
