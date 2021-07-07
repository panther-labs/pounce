import React from 'react';
import Box, { NativeAttributes } from '../Box';
import { slugify, isEmptyValue } from '../../utils/helpers';
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

  /** The decorating prefix used for  decorating issues*/
  prefix?: string;

  /** The decorating suffix used for  decorating issues*/
  suffix?: string;

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
    prefix,
    suffix,
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
  const isEmpty = isEmptyValue(value);
  return (
    <InputControl
      variant={variant}
      invalid={invalid}
      disabled={disabled}
      required={required}
      hidden={hidden}
    >
      <Flex align="center" position="relative">
        {prefix && (
          <Box
            fontSize="medium"
            fontWeight="medium"
            as="span"
            height="100%"
            color="navyblue-100"
            pt={5}
            pl={4}
            pb={2}
            opacity={isEmpty ? 0 : 1}
            visibility={isEmpty ? 'hidden' : 'visible'}
            transition="opacity,visibility 400ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
          >
            {prefix}
          </Box>
        )}
        <InputElement
          as="input"
          type="text"
          id={identifier}
          name={name}
          value={value}
          truncated
          pl={icon && iconAlignment === 'left' ? 42 : prefix ? 0 : null}
          pr={icon && iconAlignment === 'right' ? 10 : suffix ? 0 : null}
          position="relative"
          zIndex={2}
          {...rest}
          ref={ref}
        />
        <InputLabel
          raised={!isEmpty}
          htmlFor={identifier}
          left={icon && iconAlignment === 'left' ? 26 : null}
        >
          {label}
        </InputLabel>
        {suffix && (
          <Box
            fontSize="medium"
            fontWeight="medium"
            as="span"
            height="100%"
            color="navyblue-100"
            pt={5}
            pr={4}
            pb={2}
            opacity={isEmpty ? 0 : 1}
            visibility={isEmpty ? 'hidden' : 'visible'}
            transition="opacity,visibility 400ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
          >
            {suffix}
          </Box>
        )}
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
