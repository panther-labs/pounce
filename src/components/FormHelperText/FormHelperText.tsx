import React from 'react';
import Box, { BoxProps } from '../Box';

export interface FormHelperTextProps extends BoxProps {
  id: string; // we require `id` to remind people to associate it with an `aria-labeledby`
}

/**
 * Extends `Box`
 *
 * A utility component that quickly allows you to add helpful messages to form fields
 * */
const FormHelperText: React.FC<FormHelperTextProps> = ({ ...props }) => (
  <Box {...props} fontSize="small" color="gray-300" mt={2} />
);

export default FormHelperText;
