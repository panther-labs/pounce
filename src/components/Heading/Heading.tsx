import React from 'react';
import Box, { BoxProps } from '../Box';
import H from '../H';
import useHeadingStyles from './useHeadingStyles';

export interface HeadingProps extends BoxProps<'h1'> {
  /** The size of the font */
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | '2x-large' | '3x-large';
}

/**
 * Responsive typographic component. Anywhere you want to add a title to something
 * then you can use this
 * */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { size = 'medium', ...rest },
  ref
) {
  const styles = useHeadingStyles({ size });

  return <Box as={H} ref={ref} fontWeight="normal" {...styles} {...rest} />;
});

export default Heading;
