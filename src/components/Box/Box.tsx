import React from 'react';
import { NativeAttributes, pounce, SystemProps } from '../../system';
import { __DEV__ } from '../../utils/helpers';

export type BoxProps = NativeAttributes<any> & SystemProps;

/**
 * Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes.
 * */
export const Box = pounce.div;

export default Box as React.FC<BoxProps>;

if (__DEV__) {
  Box.displayName = 'Box';
}
