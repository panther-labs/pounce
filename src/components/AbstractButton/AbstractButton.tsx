import React from 'react';
import Box, { BoxProps } from '../Box';
import { defaultButtonStyles } from './utils';

export type AbstractButtonProps = BoxProps<'button'>;

export const AbstractButton = React.forwardRef<HTMLButtonElement, AbstractButtonProps>(
  function AbstractButton(props, ref) {
    return <Box as="button" ref={ref} {...defaultButtonStyles} {...props} />;
  }
);

export default AbstractButton;
