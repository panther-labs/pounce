import React from 'react';
import styled from '@emotion/styled';
import * as StyledSystem from 'styled-system';
import { customStyleProps, shouldForwardProp, SystemProps } from './system';

export type NativeHTMLAttributes<A> = Omit<A, keyof SystemProps>;

// prettier-ignore
export type BoxProps<Attrs = React.AllHTMLAttributes<HTMLElement>> =
  NativeHTMLAttributes<Attrs> &
  SystemProps &
  React.RefAttributes<HTMLElement> & {
    /** Whether should text should truncate to fill at most one line of text */
    truncated?: boolean;
  };

/** Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes. */
const Box = styled('div', {
  shouldForwardProp,
})<BoxProps>`
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
  ${StyledSystem.system(customStyleProps)}
  ${({ truncated }) => {
    if (truncated) {
      return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      };
    }
  }}
`;

export default Box as React.FC<BoxProps>;
