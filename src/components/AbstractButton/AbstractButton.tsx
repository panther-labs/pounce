import React from 'react';
import Box, { BoxProps } from '../Box';

export type AbstractButtonProps = BoxProps;

const abstractButtonStyle = {
  type: 'button',
  cursor: 'pointer',
  color: 'gray-50' as const,
  textDecoration: 'none',
  backgroundColor: 'transparent' as const,
  transition: 'all 0.1s linear',
};

export const AbstractButton = React.forwardRef<HTMLButtonElement, AbstractButtonProps>(
  function AbstractButton(props, ref) {
    return <Box as="button" ref={ref} {...abstractButtonStyle} {...props} />;
  }
);

export default AbstractButton;
