import React from 'react';
import styled from '@emotion/styled';
import * as StyledSystem from 'styled-system';
import { customStyleProps, shouldForwardProp, SystemProps } from './system';

// prettier-ignore
export type BoxProps<Attrs = React.AllHTMLAttributes<HTMLElement>> = Omit<Attrs, keyof SystemProps> & SystemProps & React.RefAttributes<HTMLElement>;

/** Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes. */
const Box = styled('div', {
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
  ${StyledSystem.system(customStyleProps)}
`;

export default Box as React.FC<BoxProps>;
