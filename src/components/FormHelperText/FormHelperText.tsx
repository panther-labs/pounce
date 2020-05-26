import React from 'react';
import Box, { BoxProps } from '../Box';

interface FormHelperTextProps extends BoxProps {
  id: string; // we require `id` to remind people to associate it with an `aria-labeledby`
}

/**
 * Extends `Box`
 *
 * A utility component that quickly allows you to add helpful messages to form fields
 * */
const FormHelperText: React.FC<FormHelperTextProps> = ({ ...props }) => (
  <Box fontSize="small" color="gray-300" mt={2} {...props} />
);

export default FormHelperText;
