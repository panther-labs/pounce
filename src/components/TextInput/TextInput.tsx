import React from 'react';
import { ReactAttributes } from '../Box';
import AbstractInput, { AbstractInputProps } from '../AbstractInput';

export type TextInputProps = ReactAttributes<React.InputHTMLAttributes<HTMLInputElement>> &
  Pick<AbstractInputProps, 'variant' | 'label' | 'invalid'>;

const TextInput: React.FC<TextInputProps> = props => (
  <AbstractInput as="input" type="text" truncated {...props} />
);

export default React.memo(TextInput);
