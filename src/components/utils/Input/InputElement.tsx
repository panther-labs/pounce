import React from 'react';
import { useInputContext } from './InputContext';
import { NativeAttributes } from '../../Box';
import Box, { BoxProps } from '../../Box';
import useTheme from '../../../utils/useTheme';

type StandaloneInputElementProps = {
  /**
   * Used in order to declare input element without labels
   */
  standalone?: boolean;
};
export type InputElementProps = BoxProps &
  NativeAttributes<'input' | 'textarea'> &
  StandaloneInputElementProps;

const InputElement = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputElementProps>(
  function InputElement({ readOnly, standalone, ...rest }, ref) {
    const { disabled, required, invalid } = useInputContext();
    const theme = useTheme();
    const pt = standalone ? 14 : 5;
    const pb = standalone ? 14 : 2;

    return (
      <Box
        ref={ref}
        as="input"
        width="100%"
        height="100%"
        px={4}
        pt={pt}
        pb={pb}
        position="relative"
        color="gray-50"
        fontSize="medium"
        fontWeight="medium"
        backgroundColor="transparent"
        border={0}
        _placeholder={{
          opacity: standalone ? 1 : 0,
          color: standalone ? 'gray-300' : 'gray-50',
          transition: 'opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          fontWeight: standalone ? 'normal' : 'medium',
        }}
        _focus={{
          '::placeholder': {
            opacity: 0.4,
            color: standalone ? 'gray-50' : undefined,
            fontWeight: standalone ? 'medium' : undefined,
          },
        }}
        // @ts-ignore `WebkitBoxShadow` and `WebkitTextFillColor` are not part of the TS CSS typings
        _autofill={{
          WebkitBoxShadow: `0 0 0 30px ${theme.colors['navyblue-600']} inset`,
          WebkitTextFillColor: theme.colors['gray-50'],
          borderRadius: 'medium',
        }}
        disabled={disabled}
        aria-disabled={disabled}
        readOnly={readOnly}
        aria-readonly={readOnly}
        required={required}
        aria-required={required}
        aria-invalid={invalid}
        {...rest}
      />
    );
  }
);

export default InputElement;
