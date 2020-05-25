import React from 'react';
import { ReactAttributes } from '../Box';
import Input, { InputProps } from '../Input';

export type TextInputProps = ReactAttributes<React.InputHTMLAttributes<HTMLInputElement>> &
  Pick<InputProps, 'variant' | 'label' | 'error'>;

const TextInput: React.FC<TextInputProps> = props => (
  <Input as="input" type="text" truncated {...props} />
);

export default React.memo(TextInput);
