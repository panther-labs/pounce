import React from 'react';
import Box, { BoxProps } from '../Box';

export type LabelProps = BoxProps<React.AllHTMLAttributes<HTMLLabelElement>> & {
  /** The size of the font */
  size: 'extra-small' | 'small' | 'medium' | 'large';
};

/**
 * Responsive typographic component. Use it within forms or wherever something needs to be labeled
 * */
const Label: React.FC<LabelProps> = React.forwardRef(function Label({ size, ...rest }, ref) {
  const sizeProps = (function() {
    switch (size) {
      case 'large':
        return { fontWeight: 'medium' as const, fontSize: 'large' as const };
      case 'medium':
        return { fontWeight: 'medium' as const, fontSize: 'medium' as const };
      case 'small':
        return { fontWeight: 'bold' as const, fontSize: 'small' as const };
      case 'extra-small':
      default:
        return { fontWeight: 'medium' as const, fontSize: 'x-small' as const };
    }
  })();

  return <Box as="label" ref={ref} {...sizeProps} {...rest} />;
});

export default Label;
