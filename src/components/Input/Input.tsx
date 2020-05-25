import React from 'react';
import Box from '../Box';
import ErrorMessage from '../ErrorMessage';
import PseudoBox, { PseudoBoxProps } from '../PseudoBox';
import { disabledStyles } from '../../utils/common';
import { slugify } from '../../utils/helpers';

export type InputProps = PseudoBoxProps & {
  /** The style of the input */
  variant: 'outlined' | 'filled';

  /** The label that is associated with this input */
  label: string;

  /** Whether the input has an error. If the value is not falsy, then its value will
   * be shown below the input. If the value is falsy, then the Input is considered fully valid
   */
  error?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled,
  variant = 'outlined',
  id,
  name,
  value,
  ...rest
}) => {
  const identifier = id || name || slugify(label);
  const isOutlined = variant === 'outlined';

  return (
    <Box {...(disabled && disabledStyles)}>
      <PseudoBox
        minHeight={47}
        position="relative"
        border="1px solid"
        transition="border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
        backgroundColor={isOutlined ? 'transparent' : 'navyblue-450'}
        borderRadius="medium"
        borderColor={!error ? 'navyblue-450' : 'red-200'}
        _hover={{
          borderColor: !error ? 'blue-600' : undefined,
        }}
        _focusWithin={{
          borderColor: !error ? 'blue-600' : undefined,
          '> label': {
            fontWeight: 'medium',
            transform: 'translate(6px, 5px) scale(0.65)',
          },
        }}
      >
        <PseudoBox
          as="input"
          disabled={disabled}
          width="100%"
          height="100%"
          px={4}
          pt={5}
          pb={2}
          position="relative"
          fontSize="medium"
          fontWeight="medium"
          backgroundColor="transparent"
          border="none"
          id={identifier}
          name={name}
          value={value}
          color="gray-50"
          _placeholder={{
            color: 'gray-50',
            opacity: 0,
            transition: 'opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          }}
          _focus={{
            '::placeholder': {
              opacity: 0.5,
            },
          }}
          {...rest}
        />
        <Box
          as="label"
          pointerEvents="none"
          fontSize="medium"
          px={4}
          htmlFor={identifier}
          color={error ? 'red-200' : 'gray-300'}
          top={0}
          left={0}
          position="absolute"
          transformOrigin="center left"
          transform={value ? 'translate(6px, 5px) scale(0.65)' : 'translate(0, 14px) scale(1)'}
          transition="transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
          fontWeight={value ? 'medium' : 'normal'}
        >
          {label}
        </Box>
      </PseudoBox>
      {error && (
        <Box mt={2}>
          <ErrorMessage>{error}</ErrorMessage>
        </Box>
      )}
    </Box>
  );
};

export default Input;
