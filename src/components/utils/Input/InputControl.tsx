import React from 'react';
import Box from '../../Box';
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

  const borderColor = React.useMemo(() => {
    if (invalid) {
      return 'red-300';
    }
    return variant === 'outline' ? 'navyblue-300' : 'navyblue-400';
  }, [variant, invalid]);
  return (
    <Box
      minHeight={47}
      overflow="auto"
      position="relative"
      border="1px solid"
      transition="border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
      backgroundColor={variant === 'outline' ? 'transparent' : 'navyblue-400'}
      borderRadius="medium"
      borderColor={borderColor}
      aria-disabled={disabled}
      aria-hidden={hidden}
      hidden={hidden}
      _hover={{
        borderColor: !invalid ? 'blue-400' : undefined,
      }}
      _focusWithin={{
        borderColor: !invalid ? 'blue-400' : undefined,
        span: {
          opacity: 1,
          visibility: 'visible',
        },
        label: {
          fontWeight: 'medium',
          transform: 'translate(6px, 4px) scale(0.65)',
        },
      }}
    >
      <InputContext.Provider value={contextValue}>{children}</InputContext.Provider>
    </Box>
  );
};

export default InputControl;
