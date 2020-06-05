import React from 'react';
import Box from '../Box';
import { generateKeyframes } from './utils';

export interface FadeInProps {
  /**
   * The direction that the components fades-in towards
   *
   * @default center
   * */
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';

  /**
   * The duration of the fade in ms
   *
   * @default 1000
   * */
  duration?: number;

  /**
   *
   * The number in ms to wait before the fading-in beging
   *
   * @default 0
   */
  delay?: number;

  /**
   *
   * Specify the distance (measured in px) from which the animation will initially begin from
   *
   * @default 25
   */
  offset?: number;
}

/**
 * A wrapper component to allow fading-in of children components, allowing a smooth enter into the
 * viewport
 */
const FadeIn: React.FC<FadeInProps> = ({
  direction = 'center',
  duration = 1000,
  delay = 0,
  offset = 25,
  children,
}) => {
  const keyframes = React.useMemo(() => generateKeyframes(direction, offset), [direction, offset]);

  return <Box animation={`${keyframes} ${duration}ms ${delay}ms ease-in-out both`}>{children}</Box>;
};

export default FadeIn;
