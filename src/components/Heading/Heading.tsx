import React from 'react';
import { NativeAttributes, pounce, SystemProps } from '../../system';
import useHeadingStyles from './useHeadingStyles';
import Box from '../Box';

export interface HeadingProps extends NativeAttributes<'h1'>, SystemProps {
  /** The size of the font */
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | '2x-large' | '3x-large';
}

/**
 * Responsive typographic component. Anywhere you want to add a title to something
 * then you can use this
 * */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { size = 'medium', ...rest },
  ref
) {
  const styles = useHeadingStyles({ size });

  return <pounce.h1 ref={ref} fontWeight="normal" {...styles} {...rest} />;
});

export default Heading;
