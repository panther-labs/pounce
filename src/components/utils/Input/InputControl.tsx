import React from 'react';
import PseudoBox from '../../PseudoBox';
import { InputContext } from './InputContext';

export type InputControlProps = {
  /** @ignore */
  hidden?: boolean;

  /** The style of the input */
  variant?: 'solid' | 'outline';

  /** Whether the input asoociated with the label has an error */
  invalid?: boolean;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Whether the input is required */
  required?: boolean;
};

const InputControl: React.FC<InputControlProps> = ({
  invalid = false,
  variant = 'outline',
  children,
  disabled,
  required,
  hidden,
}) => {
  const contextValue = React.useMemo(
    () => ({
      invalid,
      variant,
      disabled,
      required,
      hidden,
    }),
    [invalid, variant, disabled, required, hidden]
  );

  return (
    <PseudoBox
      minHeight={47}
      position="relative"
      border="1px solid"
      transition="border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
      backgroundColor={variant === 'outline' ? 'transparent' : 'navyblue-450'}
      borderRadius="medium"
      borderColor={!invalid ? 'navyblue-450' : 'red-200'}
      aria-disabled={disabled}
      aria-hidden={hidden}
      hidden={hidden}
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
      <InputContext.Provider value={contextValue}>{children}</InputContext.Provider>
    </PseudoBox>
  );
};

export default InputControl;
