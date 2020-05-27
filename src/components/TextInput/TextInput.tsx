import React from 'react';
import { ReactAttributes } from '../Box';
import { slugify } from '../../utils/helpers';
import { InputControl, InputElement, InputLabel } from '../utils/Input';

export type TextInputProps = ReactAttributes<React.InputHTMLAttributes<HTMLInputElement>> & {
  /** The label that is associated with this input */
  label: string;

  /** Whether the input has an invalid value */
  invalid?: boolean;

  /** Whether the input is required or not */
  required?: boolean;

  /** Whether the input is disabled or not */
  disabled?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  invalid,
  required,
  disabled,
  id,
  name,
  value,
  ...rest
}) => {
  const identifier = id || name || slugify(label);

  return (
    <InputControl invalid={invalid} disabled={disabled} required={required}>
      <InputElement
        as="input"
        type="text"
        id={identifier}
        name={name}
        value={value}
        truncated
        {...rest}
      />
      <InputLabel raised={!!value} htmlFor={identifier}>
        {label}
      </InputLabel>
    </InputControl>
  );
};

export default React.memo(TextInput);
