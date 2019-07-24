import React from 'react';
import styled, {
  CSSObject,
  FlattenSimpleInterpolation,
  FlattenInterpolation,
} from 'styled-components';
import * as StyledSystem from 'styled-system';
import { Theme } from 'styled-system';

// We create an adapter interface cause we have 2 clashing interfaces with regards to the `color`
// prop. To fix that we first convert it to "any" and then we explicitely re-define it as the type
// that we want.
// WARNING: DO NOT USE THIS INTERFACE EVER
interface BoxPropsWithHTMLAttributesAdapter
  extends StyledSystem.ColorProps,
    React.HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  color?: any;
}
export interface BoxProps
  extends BoxPropsWithHTMLAttributesAdapter,
    StyledSystem.SpaceProps,
    StyledSystem.FontFamilyProps,
    StyledSystem.FontSizeProps,
    StyledSystem.FontWeightProps,
    StyledSystem.WidthProps,
    StyledSystem.MinWidthProps,
    StyledSystem.HeightProps,
    StyledSystem.GridRowProps,
    StyledSystem.GridColumnProps,
    StyledSystem.ShadowProps,
    StyledSystem.BorderProps,
    StyledSystem.PositionProps,
    StyledSystem.FlexProps {
  /** The native HTML element to use for this component.
   * @default "div"
   * */
  as?: React.ElementType;

  /** Additional custom inline CSS to pass to the element
   * @default "{}"
   * */
  css?: CSSObject | FlattenSimpleInterpolation | FlattenInterpolation<Theme> | string;

  /**
   * The color utility parses a component's `color` and `bg` props and converts them into CSS declarations.
   * By default the raw value of the prop is returned.
   *
   * Color palettes can be configured with the ThemeProvider to use keys as prop values, with support for dot notation.
   * Array values are converted into responsive values.
   *
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)
   */
  color?: StyledSystem.ColorProps['color'];
}

/** Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes. */
const Box: React.FC<BoxProps> = styled.div`
  ${StyledSystem.space}
  ${StyledSystem.color}
  ${StyledSystem.fontFamily}
  ${StyledSystem.fontSize}
  ${StyledSystem.fontWeight}
  ${StyledSystem.width}
  ${StyledSystem.minWidth}
  ${StyledSystem.height}
  ${StyledSystem.gridRow}
  ${StyledSystem.gridColumn}
  ${StyledSystem.shadow}
  ${StyledSystem.border}
  ${StyledSystem.position}
  ${StyledSystem.flex}
`;

export default Box;
