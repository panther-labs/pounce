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

  /** The variant of the input that decides the colors */
  variant?: 'solid' | 'outline';

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
    variant = 'outline',
    iconAlignment = 'right',
    value,
    ...rest
  },
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
      <Flex align="center" position="relative">
        <InputElement
          as="input"
          type="text"
          id={identifier}
          name={name}
          value={value}
          truncated
          pl={icon && iconAlignment === 'left' ? 42 : null}
          pr={icon && iconAlignment === 'right' && 10}
          position="relative"
          zIndex={2}
          {...rest}
          ref={ref}
        />
        <InputLabel
          raised={!!value}
          htmlFor={identifier}
          left={icon && iconAlignment === 'left' ? 26 : null}
        >
          {label}
        </InputLabel>
        {icon && (
          <Icon
            zIndex={1}
            position="absolute"
            size="medium"
            left={iconAlignment === 'left' ? 3 : null}
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
