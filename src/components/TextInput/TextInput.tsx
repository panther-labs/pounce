import React from 'react';
import { NativeAttributes } from '../Box';
import { slugify } from '../../utils/helpers';
import Icon, { IconProps } from '../Icon';
import Flex from '../Flex';
import { InputControl, InputElement, InputLabel } from '../utils/Input';

export type TextInputProps = NativeAttributes<'input'> & {
  /** The label that is associated with this input */
  label: string;

  /** Whether the input has an invalid value */
  invalid?: boolean;

  /** Whether the input is required or not */
  required?: boolean;

  /** Whether the input is disabled or not */
  disabled?: boolean;

  /** The icon present on the input  */
  icon?: IconProps['type'];
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, invalid, required, disabled, id, hidden, name, icon, value, ...rest },
  ref
) {
  const identifier = id || name || slugify(label);

  return (
    <InputControl invalid={invalid} disabled={disabled} required={required} hidden={hidden}>
      <Flex align="center">
        <InputElement
          as="input"
          type="text"
          id={identifier}
          name={name}
          value={value}
          truncated
          {...rest}
          ref={ref}
        />
        <InputLabel raised={!!value} htmlFor={identifier}>
          {label}
        </InputLabel>
        {icon && <Icon size="small" mx={4} type={icon} />}
      </Flex>
    </InputControl>
  );
});

export default React.memo(TextInput);
