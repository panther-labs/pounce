import React from 'react';
import styled from '@emotion/styled';
import { shouldForwardProp, sxProp, stylingProps, SystemProps, truncateProp } from '../../system';

export type NativeAttributes<El extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<El>,
  keyof SystemProps
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BoxProps<Element extends React.ElementType = any> = NativeAttributes<Element> &
  SystemProps;

/**
 * Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes.
 * */
const Box = styled('div', {
  shouldForwardProp,
})<BoxProps>`
  ${stylingProps}
  ${sxProp}
  ${truncateProp}
`;

export default Box as React.FC<BoxProps>;
