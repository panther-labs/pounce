import React from 'react';
import Box, { BoxProps } from '../Box';

export interface DividerProps extends BoxProps {
  /** The direction of the divider */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Extends Box.
 *
 * A Divider is a simple component that will render a line to separate content into two sections
 */
const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color,
  backgroundColor,
  borderColor,
  ...rest
}) => {
  const borderProps =
    orientation === 'vertical'
      ? { borderLeft: '0.0625rem solid', height: 'auto', mx: 2 }
      : { borderBottom: '0.0625rem solid', width: 'auto', my: 2 };

  return (
    <Box
      as="hr"
      aria-orientation={orientation}
      border="none"
      opacity={0.6}
      {...borderProps}
      borderColor={color || backgroundColor || borderColor || 'inherit'}
      {...rest}
    />
  );
};

export default Divider;
