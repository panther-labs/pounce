import React from 'react';
import Box, { BoxProps } from '../Box';

export interface HeadingProps extends BoxProps<React.AllHTMLAttributes<HTMLHeadingElement>> {
  /** The size of the font */
  size: 'medium' | 'large';
}

/**
 * Responsive typographic component. Anywhere you want to add a title to something
 * then you can use this
 * */
const Heading: React.FC<HeadingProps> = React.forwardRef(function Heading({ size, ...rest }, ref) {
  const sizeProps = (function() {
    switch (size) {
      case 'large':
        return { fontWeight: 'medium' as const, fontSize: 5, lineHeight: 5 };
      case 'medium':
      default:
        return { fontWeight: 'normal' as const, fontSize: 4, lineHeight: 4 };
    }
  })();

  return <Box as="h1" ref={ref} {...sizeProps} {...rest} />;
});

export default Heading;