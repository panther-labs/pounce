import React from 'react';
import { NativeAttributes } from '../Box';
import { slugify } from '../../utils/helpers';
import { InputControl, InputElement, InputLabel } from '../utils/Input';
import Icon, { IconProps } from '../Icon';
import Flex from '../Flex';

export type TextIconProps = {
  color?: IconProps['color'];

  /** The size of the icon. Can be 18px or 24px */
  size?: IconProps['size'];
};

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

  /** The icon alignment  */
  iconAlignment?: 'left' | 'right';

  /** Additional icon props  */
  iconProps?: TextIconProps;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    label,
    invalid,
    required,
    disabled,
    id,
    hidden,
    name,
    icon,
    iconProps = {},
    iconAlignment = 'right',
    value,
    ...rest
  },
  ref
) {
  const identifier = id || name || slugify(label);

  return (
    <InputControl invalid={invalid} disabled={disabled} required={required} hidden={hidden}>
      <Flex align="center" position="relative" ml={icon && iconAlignment === 'left' && 30}>
        <InputElement
          as="input"
          type="text"
          id={identifier}
          name={name}
          value={value}
          truncated
          pr={icon && iconAlignment === 'right' && 10}
          position="relative"
          zIndex={2}
          {...rest}
          ref={ref}
        />
        <InputLabel raised={!!value} htmlFor={identifier}>
          {label}
        </InputLabel>
        {icon && (
          <Icon
            zIndex={1}
            position="absolute"
            size="small"
            left={iconAlignment === 'left' ? -20 : null}
            right={iconAlignment === 'right' ? 4 : null}
            type={icon}
            {...iconProps}
          />
        )}
      </Flex>
    </InputControl>
  );
});

export default React.memo(TextInput);
