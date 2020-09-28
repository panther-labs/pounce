import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { NativeAttributes } from '../Box';
import { InputControl, InputElement, InputLabel } from '../utils/Input';
import { slugify } from '../../utils/helpers';

export type TextAreaProps = NativeAttributes<'textarea'> & {
  /** The label that is associated with this textaera */
  label: string;

  /** The variant of the input that decides the colors */
  variant?: 'solid' | 'outline';

  /** Whether the textarea has an invalid value */
  invalid?: boolean;

  /** Whether the textarea is required or not */
  required?: boolean;

  /** Whether the textarea is disabled or not */
  disabled?: boolean;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, invalid, required, disabled, hidden, id, name, value, variant = 'outline', ...rest },
  ref
) {
  const identifier = id || name || slugify(label);

  return (
    <InputControl
      variant={variant}
      invalid={invalid}
      disabled={disabled}
      required={required}
      hidden={hidden}
    >
      <InputElement
        as={TextareaAutosize}
        id={identifier}
        name={name}
        value={value}
        {...rest}
        ref={ref}
      />
      <InputLabel raised={!!value} htmlFor={identifier}>
        {label}
      </InputLabel>
    </InputControl>
  );
});

export default React.memo(TextArea);
