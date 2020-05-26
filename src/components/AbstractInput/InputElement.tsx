import React from 'react';
import { ReactAttributes } from '../Box';
import PseudoBox from '../PseudoBox';

export type InputElementProps = ReactAttributes<React.InputHTMLAttributes<HTMLInputElement>>;

const InputElement: React.FC<InputElementProps> = ({ disabled, ...rest }) => {
  return (
    <PseudoBox
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
  );
};

export default InputElement;
