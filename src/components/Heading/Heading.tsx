import React from 'react';
import Box, { BoxProps } from '../Box';
import useHeadingStyles from './useHeadingStyles';

export interface HeadingProps extends BoxProps<React.AllHTMLAttributes<HTMLHeadingElement>> {
  /** The size of the font */
  size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | '2x-large' | '3x-large';
}

/**
 * Responsive typographic component. Anywhere you want to add a title to something
 * then you can use this
 * */
const Heading: React.FC<HeadingProps> = React.forwardRef(function Heading({ size, ...rest }, ref) {
  const styles = useHeadingStyles({ size });

  return <Box as="h1" ref={ref} fontWeight="normal" {...styles} {...rest} />;
});

export default Heading;
