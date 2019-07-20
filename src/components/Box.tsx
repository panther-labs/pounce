import React from 'react';
import { Box as RebassBox, BoxProps as RebassBoxProps } from 'rebass';

interface BoxProps extends RebassBoxProps {
  /** The native HTML element to use for this component.
   * @default "div"
   * */
  as?: React.ElementType;
}

/** Responsive box-model layout component. Apart from the defined props,
 * it also supports all the native HTML attributes. */
const Box = (props: BoxProps) => <RebassBox {...props} />;

export default Box;
