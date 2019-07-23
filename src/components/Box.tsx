import React from 'react';
import styled, {
  CSSObject,
  FlattenSimpleInterpolation,
  FlattenInterpolation,
} from 'styled-components';
import * as StyledSystem from 'styled-system';
import { Theme } from 'styled-system';

export interface BoxProps
  extends StyledSystem.SpaceProps,
    StyledSystem.ColorProps,
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
