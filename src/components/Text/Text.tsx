import React from 'react';
import Box, { BoxProps } from '../Box';

export type TextProps = BoxProps<'p'>;

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * Responsive typographic component. Anywhere you want to add some text that doesn't constitute a
 * heading or a title, this component is what you need.
 *
 * */
const Text: React.FC<TextProps> = React.forwardRef(function Text(props, ref) {
  return <Box ref={ref} as="p" {...props} />;
});

export default Text;
