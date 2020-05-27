import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactAttributes } from '../Box';
import { InputControl, InputElement, InputLabel } from '../utils/Input';
import { slugify } from '../../utils/helpers';

export type TextAreaProps = ReactAttributes<React.TextareaHTMLAttributes<HTMLTextAreaElement>> & {
  /** The label that is associated with this textaera */
  label: string;

  /** Whether the textarea has an invalid value */
  invalid?: boolean;

  /** Whether the textarea is required or not */
  required?: boolean;

  /** Whether the textarea is disabled or not */
  disabled?: boolean;
};

const TextArea: React.FC<TextAreaProps> = ({
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
      <InputElement as={TextareaAutosize} id={identifier} name={name} value={value} {...rest} />
      <InputLabel raised={!!value} htmlFor={identifier}>
        {label}
      </InputLabel>
    </InputControl>
  );
};

export default TextArea;
