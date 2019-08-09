import React from 'react';
import styled, { CSSProp } from 'styled-components';
import { SystemStyleObject, CSSObject } from '@styled-system/css';
import * as StyledSystem from 'styled-system';

// We create an adapter interface cause we have 2 clashing interfaces with regards to the `color`
// prop. To fix that we first convert it to "any" and then we explicitely re-define it as the type
// that we want.
// WARNING: DO NOT USE THIS INTERFACE EVER
interface BoxPropsWithHTMLAttributesAdapter<T>
  extends StyledSystem.ColorProps,
    Omit<React.AllHTMLAttributes<T>, 'size'> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  as?: any;
  color?: any;
  height?: any;
  width?: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export interface BoxProps<T = HTMLElement>
  extends BoxPropsWithHTMLAttributesAdapter<T>,
    StyledSystem.SpaceProps,
    StyledSystem.FontFamilyProps,
    StyledSystem.FontSizeProps,
    StyledSystem.FontWeightProps,
    StyledSystem.WidthProps,
    StyledSystem.MinWidthProps,
    StyledSystem.MaxWidthProps,
    StyledSystem.HeightProps,
    StyledSystem.MinHeightProps,
    StyledSystem.MaxHeightProps,
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
  css?: CSSProp | ((input?: SystemStyleObject) => CSSObject);

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

  /**
   *   The width utility parses a component's `width` prop and converts it into a CSS width declaration.
   *
   *   - Numbers from 0-1 are converted to percentage widths.
   *   - Numbers greater than 1 are converted to pixel values.
   *   - String values are passed as raw CSS values.
   *   - And arrays are converted to responsive width styles.
   */
  width?: StyledSystem.WidthProps['width'];

  /**
   * The height CSS property specifies the height of an element. By default, the property defines the height of the
   * content area. If box-sizing is set to border-box, however, it instead determines the height of the border area.
   *
   * [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
   */
  height?: StyledSystem.HeightProps['height'];
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
  ${StyledSystem.maxWidth}
  ${StyledSystem.height}
  ${StyledSystem.minHeight}
  ${StyledSystem.maxHeight}
  ${StyledSystem.gridRow}
  ${StyledSystem.gridColumn}
  ${StyledSystem.shadow}
  ${StyledSystem.border}
  ${StyledSystem.position}
  ${StyledSystem.flex}
`;

export default Box;
