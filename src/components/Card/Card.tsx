import React from 'react';
import Box, { BoxProps } from '../Box';

export type CardProps = BoxProps;

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * A card is simply a basic layout component with additional style props.
 */
const Card: React.FC<CardProps> = React.forwardRef(function Card(props, ref) {
  return <Box ref={ref} bg="navyblue-600" borderRadius="medium" {...props} />;
});

export default Card;
