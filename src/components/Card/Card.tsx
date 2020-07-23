import React from 'react';
import Box, { BoxProps } from '../Box';

export type CardProps = Omit<BoxProps, 'bg' | 'background' | 'backgroundColor' | 'borderRadius'> & {
  /** Whether the card should be light blue-navy or dark blue-navy */
  variant?: 'light' | 'dark';
};

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * A card is simply a basic layout component with additional style props.
 */
export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  { variant = 'light', ...rest },
  ref
) {
  return (
    <Box
      ref={ref}
      bg={variant === 'light' ? 'navyblue-400' : 'navyblue-500'}
      borderRadius="medium"
      {...rest}
    />
  );
});

export default Card;
