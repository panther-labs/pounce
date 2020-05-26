import React from 'react';
import PseudoBox from '../PseudoBox';

export type InputWrapperProps = {
  /** The style of the input */
  variant: 'outlined' | 'filled';

  /** Whether the input asoociated with the label has an error */
  invalid?: boolean;
};

const InputWrapper: React.FC<InputWrapperProps> = ({
  invalid = false,
  variant = 'outlined',
  children,
}) => (
  <PseudoBox
    minHeight={47}
    position="relative"
    border="1px solid"
    transition="border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
    backgroundColor={variant === 'outlined' ? 'transparent' : 'navyblue-450'}
    borderRadius="medium"
    borderColor={!invalid ? 'navyblue-450' : 'red-200'}
    _hover={{
      borderColor: !invalid ? 'blue-600' : undefined,
    }}
    _focusWithin={{
      borderColor: !invalid ? 'blue-600' : undefined,
      label: {
        fontWeight: 'medium',
        transform: 'translate(6px, 4px) scale(0.65)',
      },
    }}
  >
    {children}
  </PseudoBox>
);

export default InputWrapper;
