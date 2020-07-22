import React from 'react';
import styled from '../../system/styled';
import * as StyledSystem from 'styled-system';
import { customStyleProps, shouldForwardProp, SystemProps } from './system';

export type NativeAttributes<El extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<El>,
  keyof SystemProps
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BoxProps<Element extends React.ElementType = any> = NativeAttributes<Element> &
  SystemProps & {
    /** Whether should text should truncate to fill at most one line of text */
    truncated?: boolean;
  };

/**
 * Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes.
 * */
const Box = styled('div');

export default Box as React.FC<BoxProps>;
