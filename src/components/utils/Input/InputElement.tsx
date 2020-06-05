import React from 'react';
import { useInputContext } from './InputContext';
import { NativeAttributes } from '../../Box';
import PseudoBox, { PseudoBoxProps } from '../../PseudoBox';

export type InputElementProps = PseudoBoxProps &
  NativeAttributes<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>>;

const InputElement = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputElementProps>(
  function InputElement({ readOnly, ...rest }, ref) {
    const { disabled, required, invalid } = useInputContext();

    return (
      <PseudoBox
        ref={ref}
        as="input"
        verticalAlign="top"
        width="100%"
        height="100%"
        px={4}
        pt={5}
        pb={2}
        position="relative"
        color="gray-50"
        fontSize="medium"
        fontWeight="medium"
        backgroundColor="transparent"
        border="none"
        _disabled={{
          opacity: 1, // we have nested disabled elements, so we don't want lower opacities to multiply
        }}
        _placeholder={{
          opacity: 0,
          color: 'gray-50',
          transition: 'opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        }}
        _focus={{
          '::placeholder': {
            opacity: 0.4,
          },
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
