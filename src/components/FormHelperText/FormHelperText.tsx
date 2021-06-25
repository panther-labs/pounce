import React from 'react';
import Text, { TextProps } from 'components/Text';

export interface FormHelperTextProps extends TextProps {
  id: string; // we require `id` to remind people to associate it with an `aria-describedby`
}

/**
 * Extends `Text`
 *
 * A utility component that quickly allows you to add helpful messages to form fields
 * */
const FormHelperText: React.FC<FormHelperTextProps> = props => (
  <Text fontSize="small" color="gray-300" {...props} />
);

export default FormHelperText;
