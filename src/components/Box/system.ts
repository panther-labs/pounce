import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
import { SerializedStyles } from '@emotion/react';
import * as StyledSystem from 'styled-system';
import { Theme } from '../../theme';
import React from 'react';

// prettier-ignore
// Gather all the styled-system props that we are going to pass
type ThemedStyleProps =
  StyledSystem.SpaceProps<Theme> &
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
   * @default undefined
   */
  to?: string;
};

// Props related to the usage of the Emotion CSS-in-JS library
type EmotionProps = {
  /** The React Component or native HTML element to render instead.
   * @default "div"
   */
  is?: React.ElementType;
  /** Additional custom inline CSS to pass to the element
   * @default "{}"
   */
  css?: SerializedStyles;
};

// Gather the custom-named props that styled-system should accept
interface CustomStyleProps {
  shadow?: ThemedStyleProps['boxShadow'];
  fill?: ThemedStyleProps['color'];
  stroke?: ThemedStyleProps['color'];
  textDecoration?: StyledSystem.ResponsiveValue<React.CSSProperties['textDecoration']>;
  overflowX?: StyledSystem.OverflowProps['overflow'];
  overflowY?: StyledSystem.OverflowProps['overflow'];
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
  willChange?: StyledSystem.ResponsiveValue<React.CSSProperties['willChange']>;
}

export const customStyleProps: Record<keyof CustomStyleProps, object | boolean> = {
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
  overflowX: true,
  overflowY: true,
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
};

// All of the allowed props gathered together
export type SystemProps = ThemedStyleProps & CustomStyleProps & RoutingProps & EmotionProps;

// extend the forwarded props by stuff that styled-system doesn't deal with
export const shouldForwardProp = createShouldForwardProp([
  ...props,
  'textDecoration',
  'pointerEvents',
  'visibility',
  'transform',
  'cursor',
]);
