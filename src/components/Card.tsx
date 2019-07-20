import React from 'react';
import { Card as RebassCard, CardProps } from 'rebass';

/**
 * Extends <a href="/#/Box">Box</a>
 *
 * A card is simply a basic layout component with additional style props.
 */
const Card = (props: CardProps) => (
  <RebassCard bg="white" borderRadius="small" boxShadow={1} padding={9} {...props} />
);

export default Card;
