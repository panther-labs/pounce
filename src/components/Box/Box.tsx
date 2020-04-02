import React from 'react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';
import * as StyledSystem from 'styled-system';
import { Theme } from '../../themes/default';
import { extraConfig, shouldForwardProp } from './config';

// prettier-ignore
// Gather all the styled-system props that we are going to pass
type StyledSystemProps =
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

// Gather the custom-named props that styled-system should accept
type CustomStyleProps = {
  shadow?: StyledSystemProps['boxShadow'];
};

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

// All of the allowed props gathered together
type AllowedProps = StyledSystemProps & CustomStyleProps & RoutingProps & EmotionProps;

// Allow all HTML attributes, except for the ones that we use as props
type AllowedHTMLAttributes<Attributes> = Omit<Attributes, keyof AllowedProps>;

export type BoxProps<Attributes = React.AllHTMLAttributes<HTMLElement>> = AllowedHTMLAttributes<
  Attributes
> &
  AllowedProps & {
    /**
     * The `ref` that will be forwarded down to the base HTML component. For example if you want
     * `Button` to forward its reference all the way down to the actual `<button>` element, you would
     * use `<Button innerRef={myRef} />`
     */
    innerRef?: React.Ref<any>;

    /**
     * Disallow emotion's `as` prop
     * @ignore
     */
    as?: never;
  };

/** Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes. */
const BaseBox: React.FC<{ ref?: React.LegacyRef<any> }> = styled('div', {
  shouldForwardProp,
})`
  ${StyledSystem.space}
  ${StyledSystem.color}
  ${StyledSystem.layout}
  ${StyledSystem.background}
  ${StyledSystem.grid}
  ${StyledSystem.shadow}
  ${StyledSystem.border} 
  ${StyledSystem.position}
  ${StyledSystem.flexbox}
  ${StyledSystem.typography}
  ${StyledSystem.system(extraConfig)}
`;

const Box: React.FC<BoxProps> = ({ is, innerRef, ...rest }) => (
  <BaseBox ref={innerRef} as={is} {...rest} />
);

export default Box;
