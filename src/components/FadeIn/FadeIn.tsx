import React from 'react';
import Box from '../Box';
import { generateKeyframes } from './utils';

export interface FadeInProps {
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
}

/**
 * A wrapper component to allow fading-in of children components, allowing a smooth enter into the
 * viewport
 */
const FadeIn: React.FC<FadeInProps> = ({ direction = 'center', children }) => {
  const keyframes = React.useMemo(() => generateKeyframes(direction), [direction]);

  return <Box animation={`${keyframes} 1s ease-in-out`}>{children}</Box>;
};

export default FadeIn;
