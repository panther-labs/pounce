import React from 'react';
import { css, PseudoProps, pseudoSelectors, SystemStyleObject } from '@chakra-ui/styled-system';
import { compose } from 'styled-system';
import * as StyledSystem from 'styled-system';
import * as H from 'history';
import { Theme } from '../theme';
import { FunctionInterpolation } from '@emotion/react';

export const domElements = [
  'a',
  'article',
  'aside',
  'blockquote',
  'button',
  'caption',
  'cite',
  'circle',
  'code',
  'dd',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'img',
  'input',
  'kbd',
  'label',
  'li',
  'mark',
  'nav',
  'ol',
  'p',
  'path',
  'pre',
  'q',
  'rect',
  's',
  'svg',
  'section',
  'select',
  'small',
  'span',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
] as const;

export type DOMElements = typeof domElements[number];

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

  /** Additional custom inline CSS to pass to the element
   * @ignore
   */
  css?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

// Gather the custom-named props that styled-system should accept
type CustomStyleProps = {
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
};

type UtilityProps = {
  /**
   * Whether  the text should ellipsify or not
   */
  truncated?: boolean;

  /**
   * A utility for adding custom
   */
  sx?: SystemStyleObject;
};

type AllProps = ThemedStyleProps & CustomStyleProps & RoutingProps & EmotionProps & UtilityProps;

// All of the allowed props gathered together
export type SystemProps = AllProps & PseudoProps<AllProps>;

// The attributes of a component that are orthogonal to the props of the styled system
export type NativeAttributes<El extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<El>,
  keyof SystemProps
>;

const customStyleProps: Record<keyof CustomStyleProps, boolean | StyledSystem.ConfigStyle> = {
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

export const systemProps = compose(
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

export const truncateProp: FunctionInterpolation<Theme> = ({ truncated }: any) => {
  if (truncated) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  }
};

export const pseudoProps = ({ theme, ...props }: any) => {
  let result = {};
  for (const prop in props) {
    if (prop in pseudoSelectors) {
      const style = css({ [prop]: props[prop] })(theme);
      result = { ...result, ...style };
    }
  }
  return result;
};

export const sxProp = (props: any) => css(props.sx)(props.theme);

export const defaultStyleProp = (defaultStyle: any) => (props: any) =>
  css(defaultStyle)(props.theme);
