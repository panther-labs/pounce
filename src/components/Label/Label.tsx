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
        return { fontWeight: 'medium' as const, fontSize: 3, lineHeight: 3 };
      case 'medium':
        return { fontWeight: 'medium' as const, fontSize: 2, lineHeight: 2 };
      case 'small':
        return { fontWeight: 'bold' as const, fontSize: 1, lineHeight: 1 };
      case 'extra-small':
      default:
        return { fontWeight: 'medium' as const, fontSize: 0, lineHeight: 0 };
    }
  })();

  return <Box as="label" ref={ref} {...sizeProps} {...rest} />;
});

export default Label;
