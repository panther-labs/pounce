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
const Box: React.FC<BoxProps> = ({
  children,
  as: As = 'div',
  position,
  display,
  m,
  mx,
  my,
  ml,
  mr,
  mb,
  mt,
  px,
  py,
  pl,
  pr,
  pt,
  pb,
  p,
}) => {
  const marginLeft = ml || mx || m || 0;
  const marginRight = mr || mx || m || 0;
  const marginTop = mt || my || m || 0;
  const marginBottom = mb || my || m || 0;
  const paddingLeft = pl || px || p || 0;
  const paddingRight = pr || px || p || 0;
  const paddingTop = pt || py || p || 0;
  const paddingBottom = pb || py || p || 0;
  return (
    <As
      style={{
        position,
        display,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
      }}
    >
      {children}
    </As>
  );
};

// FIXME: This overrides the fact that the box is a `div`. Components implementing this will warn us
//  that they can't implement `<Box>` when they themselves are not a div. We should ideally fix that
//  and have `ref` can be properly typed  in all components
export default Box as React.FC<BoxProps>;

if (__DEV__) {
  Box.displayName = 'Box';
}
