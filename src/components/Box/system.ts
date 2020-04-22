import React from 'react';
import { createShouldForwardProp, props } from '@styled-system/should-forward-prop';
import * as StyledSystem from 'styled-system';
import { Theme } from '../../theme';

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
  to?: string;
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
  css?: any;
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
  borderCollapse: true,
  tableLayout: true,
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

// Transform the custom alias to a format that styled-system CSS supports
function transformCustomStyleAlias(
  propName: keyof CustomStyleProps,
  propValue: CustomStyleProps[keyof CustomStyleProps]
) {
  const customStylePropValue = customStyleProps[propName];
  if (typeof customStylePropValue === 'object') {
    return { [customStylePropValue.property as string]: propValue };
  }
  if (customStylePropValue === true) {
    return {
      [propName]: propValue,
    };
  }
  return {};
}

// Transform the custom alias to a format that styled-system CSS supports
function transformThemedAlias(
  propName: keyof ThemedStyleProps,
  propValue: ThemedStyleProps[keyof ThemedStyleProps]
) {
  return {
    [propName]: propValue,
  };
}

// Transform the custom alias to a format that styled-system CSS supports
const transformAlias = (
  propName: keyof ThemedStyleProps & keyof CustomStyleProps,
  propValue: ThemedStyleProps[keyof ThemedStyleProps] & CustomStyleProps[keyof CustomStyleProps]
) => {
  if (Object.keys(customStyleProps).includes(propName)) {
    return transformCustomStyleAlias(propName, propValue);
  }
  return transformThemedAlias(propName, propValue);
};

export const transformAliasProps = (props?: SystemProps): SystemProps => {
  let result = {};
  if (!props) {
    return result;
  }

  for (const propName in props) {
    // @ts-ignore
    const propValue = props[propName];
    if (typeof propValue === 'object' && !Array.isArray(propValue)) {
      result = { ...result, [propName]: transformAliasProps(propValue) };
    } else {
      result = {
        ...result,
        ...transformAlias(propName as keyof (ThemedStyleProps | CustomStyleProps), propValue),
      };
    }
  }
  return result;
};
