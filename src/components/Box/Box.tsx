import React from 'react';
import { NativeAttributes, PounceComponentProps } from '../../system';
import { __DEV__ } from '../../utils/helpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BoxProps<T extends React.ElementType = any> = PounceComponentProps<T>;
export type { NativeAttributes };

/**
 * Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes.
 * */
// @ts-nocheck
const Box = React.forwardRef<HTMLElement, BoxProps>(function Box(
  { children, as: As = 'div' },
  ref
) {
  return <As ref={ref}>{children}</As>;
});

// FIXME: This overrides the fact that the box is a `div`. Components implementing this will warn us
//  that they can't implement `<Box>` when they themselves are not a div. We should ideally fix that
//  and have `ref` can be properly typed  in all components
export default Box as React.FC<BoxProps>;

if (__DEV__) {
  Box.displayName = 'Box';
}
