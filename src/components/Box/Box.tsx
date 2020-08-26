import React from 'react';
import styled from '@emotion/styled';
import {
  shouldForwardProp,
  sxProp,
  stylingProps,
  SystemProps,
  truncateProp,
  pseudoProps,
  visuallyHiddenProp,
} from '../../system';
import { __DEV__ } from '../../utils/helpers';

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
  ${pseudoProps}
  ${sxProp}
  ${truncateProp}
  ${visuallyHiddenProp}
`;

export default Box as React.FC<BoxProps>;

if (__DEV__) {
  Box.displayName = 'Box';
}
