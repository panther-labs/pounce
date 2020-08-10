import React, { ChangeEventHandler } from 'react';
import Box, { NativeAttributes } from '../Box';
import { slugify } from '../../utils/helpers';
import Icon, { IconProps } from '../Icon';
import Flex from '../Flex';
import { InputControl, InputElement, InputLabel } from '../utils/Input';
import { noop } from '../../utils/helpers';

export type DoubleTextInputProps = NativeAttributes<'input'> & {
  /** The `from` label for the double text input*/
  labelFrom: string;

  /** The `to` label for the double text input*/
  labelTo: string;

  /** The `from` placeholder for the double text input*/
  placeholderFrom?: string;

  /** The `to` placeholder for the double text input*/
  placeholderTo?: string;

  /** The `from` value for the double text input*/
  from?: string | ReadonlyArray<string> | number;

  /** The `to` value for the double text input*/
  to?: string | ReadonlyArray<string> | number;

  /** Whether the input has an invalid value */
  invalid?: boolean;

  /** Whether the input is required or not */
  required?: boolean;

  /** On change `from` event handlers */
  onChangeFrom?: ChangeEventHandler;

  /** On change `to` event handlers */
  onChangeTo?: ChangeEventHandler;

  /** Whether the input is disabled or not */
  disabled?: boolean;

  /** The icon present on the input  */
  icon?: IconProps['type'];
};

const getIdentifier = (
  id: string | undefined,
  name: string | undefined,
  label: string,
  suffix: string
): string => {
  if (id) {
    return `${id}-${suffix}`;
  }
  if (name) {
    return `${name}-${suffix}`;
  }

  return `${slugify(label)}-${suffix}`;
};

const DoubleTextInput = React.forwardRef<HTMLInputElement, DoubleTextInputProps>(
  function DoubleTextInput(
    {
      labelFrom,
      labelTo,
      invalid,
      required,
      disabled,
      id,
      hidden,
      name,
      icon,
      from,
      to,
      placeholderFrom,
      placeholderTo,
      onChangeFrom = noop,
      onChangeTo = noop,
      ...rest
    },
    ref
  ) {
    const identifierFrom = getIdentifier(id, name, labelFrom, 'from');
    const identifierTo = getIdentifier(id, name, labelTo, 'to');

    return (
      <Box position="relative">
        <InputControl invalid={invalid} disabled={disabled} required={required} hidden={hidden}>
          <Flex align="center">
            <Box position="relative">
              <InputElement
                as="input"
                type="text"
                id={identifierFrom}
                name={identifierFrom}
                value={from}
                {...rest}
                placeholder={placeholderFrom}
                onChange={onChangeFrom}
                ref={ref}
              />
              <InputLabel raised={!!from} htmlFor={identifierFrom}>
                {labelFrom}
              </InputLabel>
            </Box>
            <Box position="relative">-</Box>
            <Box position="relative">
              <InputElement
                as="input"
                type="text"
                id={identifierTo}
                name={identifierTo}
                value={to}
                {...rest}
                placeholder={placeholderTo}
                onChange={onChangeTo}
                ref={ref}
              />
              <InputLabel raised={!!to} htmlFor={identifierTo}>
                {labelTo}
              </InputLabel>
            </Box>
            {icon && <Icon size="small" mx={4} type={icon} />}
          </Flex>
        </InputControl>
      </Box>
    );
  }
);

export default React.memo(DoubleTextInput);
