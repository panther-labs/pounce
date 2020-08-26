import React from 'react';
import * as StyledSystem from 'styled-system';
import * as H from 'history';
import { Theme } from '../theme';
import { UtilityProps } from './utility';
import { PseudoProps } from './pseudo';

// prettier-ignore
// Gather all the styled-system props that we are going to pass
type ThemedStyleProps =
  StyledSystem.SpaceProps<Theme, React.CSSProperties['margin']> &
  StyledSystem.ColorProps<Theme> &
  StyledSystem.LayoutProps<Theme> &
  StyledSystem.BackgroundProps<Theme> &
  StyledSystem.GridProps<Theme> &
  StyledSystem.ShadowProps<Theme> &
  StyledSystem.BorderProps<Theme> &
  StyledSystem.PositionProps<Theme> &
  StyledSystem.FlexboxProps<Theme> &
  StyledSystem.TypographyProps<Theme>;

// Props related to Link components in @reach/router & react-router
type RoutingProps = {
  /** The url path to navigate, if the component implements a Link
   * @ignore
   */
  to?:
    | H.LocationDescriptor<H.LocationState>
    | ((location: H.Location<H.LocationState>) => H.LocationDescriptor<H.LocationState>);
};

// Props related to the usage of the Emotion CSS-in-JS library
type EmotionProps = {
  /** The React Component or native HTML element to render instead.
   * @default "div"
   * @ignore
   */
  as?: React.ElementType;
};

// Gather the custom-named props that styled-system should accept
export interface CustomStyleProps {
  shadow?: ThemedStyleProps['boxShadow'];
  fill?: ThemedStyleProps['color'];
  stroke?: ThemedStyleProps['color'];
  textDecoration?: StyledSystem.ResponsiveValue<React.CSSProperties['textDecoration']>;
  textTransform?: StyledSystem.ResponsiveValue<React.CSSProperties['textTransform']>;

  animation?: StyledSystem.ResponsiveValue<React.CSSProperties['animation']>;
  transform?: StyledSystem.ResponsiveValue<React.CSSProperties['transform']>;
  visibility?: StyledSystem.ResponsiveValue<React.CSSProperties['visibility']>;
  whiteSpace?: StyledSystem.ResponsiveValue<React.CSSProperties['whiteSpace']>;
  pointerEvents?: StyledSystem.ResponsiveValue<React.CSSProperties['pointerEvents']>;
  wordBreak?: StyledSystem.ResponsiveValue<React.CSSProperties['wordBreak']>;
  overflowWrap?: StyledSystem.ResponsiveValue<React.CSSProperties['overflowWrap']>;
  textOverflow?: StyledSystem.ResponsiveValue<React.CSSProperties['textOverflow']>;
  cursor?: StyledSystem.ResponsiveValue<React.CSSProperties['cursor']>;
  resize?: StyledSystem.ResponsiveValue<React.CSSProperties['resize']>;
  transition?: StyledSystem.ResponsiveValue<React.CSSProperties['transition']>;
  objectFit?: StyledSystem.ResponsiveValue<React.CSSProperties['objectFit']>;
  outline?: StyledSystem.ResponsiveValue<React.CSSProperties['outline']>;
  userSelect?: StyledSystem.ResponsiveValue<React.CSSProperties['userSelect']>;
  transformOrigin?: StyledSystem.ResponsiveValue<React.CSSProperties['transformOrigin']>;
  willChange?: StyledSystem.ResponsiveValue<React.CSSProperties['willChange']>;
  borderCollapse?: StyledSystem.ResponsiveValue<React.CSSProperties['borderCollapse']>;
  tableLayout?: StyledSystem.ResponsiveValue<React.CSSProperties['tableLayout']>;
}

export const customStyleProps: Record<
  keyof CustomStyleProps,
  boolean | StyledSystem.ConfigStyle
> = {
  shadow: {
    property: 'boxShadow' as const,
    scale: 'shadows',
  },
  fill: {
    property: 'fill' as const,
    scale: 'colors',
  },
  stroke: {
    property: 'stroke' as const,
    scale: 'colors',
  },
  textDecoration: true,
  textTransform: true,
  animation: true,
  transform: true,
  visibility: true,
  whiteSpace: true,
  pointerEvents: true,
  wordBreak: true,
  overflowWrap: true,
  textOverflow: true,
  cursor: true,
  resize: true,
  transition: true,
  objectFit: true,
  outline: true,
  willChange: true,
  userSelect: true,
  borderCollapse: true,
  tableLayout: true,
  transformOrigin: true,
};

export type StylingProps = ThemedStyleProps & CustomStyleProps;
export const stylingProps = StyledSystem.compose(
  StyledSystem.space,
  StyledSystem.color,
  StyledSystem.layout,
  StyledSystem.background,
  StyledSystem.grid,
  StyledSystem.shadow,
  StyledSystem.border,
  StyledSystem.position,
  StyledSystem.flexbox,
  StyledSystem.typography,
  StyledSystem.system(customStyleProps)
);

// All of the allowed props gathered together
export type SystemProps = StylingProps & RoutingProps & EmotionProps & PseudoProps & UtilityProps;
