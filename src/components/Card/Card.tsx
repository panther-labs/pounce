import React from 'react';
import Box, { BoxProps } from '../Box';
import useCardVariantBackground from './useCardVariantBackground';

export type CardProps = Omit<BoxProps, 'bg' | 'background' | 'backgroundColor' | 'borderRadius'> & {
  /** Whether the card should be light blue-navy or dark blue-navy */
  variant?: 'light' | 'lighter' | 'dark' | 'darker';
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
  const bg = useCardVariantBackground({ variant });

  return <Box ref={ref} bg={bg} borderRadius="medium" {...rest} />;
});

export default Card;
