import React from 'react';
import Box, { BoxProps } from '../Box';

export type CardProps = BoxProps & {
  variant?: 'light' | 'dark';
};

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * A card is simply a basic layout component with additional style props.
 */
const Card: React.FC<CardProps> = React.forwardRef(function Card(
  { variant = 'light', ...rest },
  ref
) {
  return (
    <Box
      ref={ref}
      bg={variant === 'light' ? 'navyblue-600' : 'navyblue-700'}
      borderRadius="medium"
      {...rest}
    />
  );
});

export default Card;
