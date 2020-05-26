import React from 'react';
import Box, { ReactAttributes } from '../Box';

export type InputLabelProps = ReactAttributes<React.LabelHTMLAttributes<HTMLLabelElement>> & {
  /** Whether the input asoociated with the label has an error */
  invalid?: boolean;

  /**  Whether the label should be raised up or not. Defaults to `true` */
  raised?: boolean;
};

const InputLabel: React.FC<InputLabelProps> = ({
  invalid = false,
  raised = true,
  children,
  ...rest
}) => {
  return (
    <Box
      as="label"
      pointerEvents="none"
      fontSize="medium"
      px={4}
      color={invalid ? 'red-200' : 'gray-300'}
      top={0}
      left={0}
      position="absolute"
      transformOrigin="center left"
      transform={raised ? 'translate(6px, 4px) scale(0.65)' : 'translate(0, 14px) scale(1)'}
      transition="transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
      fontWeight={raised ? 'medium' : 'normal'}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default InputLabel;
