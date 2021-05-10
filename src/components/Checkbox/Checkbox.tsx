import React from 'react';
import Box, { NativeAttributes } from '../Box';
import useCheckboxStyles from './useCheckboxStyles';

export type CheckboxProps = NativeAttributes<'input'> & {
  /** The label associated with the Checkbox. Appears on the right. */
  label?: string;

  /** Whether the checkbox is currently disabled */
  disabled?: boolean;

  /**  Whether the input has an invalid value or not */
  invalid?: boolean;

  /**  Whether the input state cannot be determined in binary terms */
  indeterminate?: boolean;
};

/**
 *  Your bread & butter checkbox element. Nothing new here
 *  */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked, label, disabled, readOnly, invalid, indeterminate, hidden, ...rest },
  ref
) {
  const checkboxStyles = useCheckboxStyles({ invalid, checked, indeterminate });

  if (!label && !(rest['aria-label'] || rest['aria-labelledby'])) {
    console.error(
      'The `label` prop was omitted without providing an `aria-label` or `aria-labelledby` attribute'
    );
  }

  return (
    <Box
      as="label"
      display="inline-flex"
      alignItems="center"
      cursor="pointer"
      fontSize="medium"
      fontWeight="medium"
      verticalAlign="top"
      aria-disabled={disabled}
      hidden={hidden}
      aria-hidden={hidden}
    >
      <Box position="relative" borderRadius="circle" p={2} {...checkboxStyles}>
        <Box
          ref={ref}
          as="input"
          cursor="pointer"
          position="absolute"
          opacity={0}
          type="checkbox"
          readOnly={readOnly}
          aria-readonly={readOnly}
          aria-invalid={invalid}
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          {...rest}
        />
      </Box>
      {label && (
        <Box as="span" userSelect="none">
          {label}
        </Box>
      )}
    </Box>
  );
});

export default React.memo(Checkbox);
