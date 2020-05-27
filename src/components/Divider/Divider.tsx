import React from 'react';
import Box from '../Box';

interface DividerProps {
  /** The direction of the divider */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Extends Box.
 *
 * A Divider is a simple component that will render a line to separate content into two sections
 */
const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', ...rest }) => {
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
      borderColor="inherit"
      {...borderProps}
      {...rest}
    />
  );
};

export default Divider;
