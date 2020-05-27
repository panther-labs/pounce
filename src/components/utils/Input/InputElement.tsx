import React from 'react';
import { useInputContext } from './InputContext';
import { ReactAttributes } from '../../Box';
import PseudoBox, { PseudoBoxProps } from '../../PseudoBox';

export type InputElementProps = PseudoBoxProps &
  ReactAttributes<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>>;

const InputElement: React.FC<InputElementProps> = props => {
  const { disabled, required } = useInputContext();

  return (
    <PseudoBox
      as="input"
      disabled={disabled}
      verticalAlign="top"
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
      color="gray-50"
      _placeholder={{
        color: 'gray-50',
        opacity: 0,
        transition: 'opacity 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
      }}
      _focus={{
        '::placeholder': {
          opacity: 0.4,
        },
      }}
      required={required}
      aria-required={required}
      {...props}
    />
  );
};

export default InputElement;
