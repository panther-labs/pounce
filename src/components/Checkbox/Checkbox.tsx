import React from 'react';
import Box, { NativeAttributes } from '../Box';
import PseudoBox from '../PseudoBox';
import useCheckboxStyles from './useCheckboxStyles';

export type CheckboxProps = NativeAttributes<React.InputHTMLAttributes<HTMLInputElement>> & {
  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean, e: React.SyntheticEvent) => void;

  /** The label associated with the Checkbox. Appears on the right. */
  label?: string;

  /** Whether the checkbox is currently disabled */
  disabled?: boolean;

  /**  Whether the input has an invalid value or not */
  invalid?: boolean;
};

/**
 *  Your bread & butter checkbox element. Nothing new here
 *  */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { checked, onChange, label, disabled = false, readOnly = false, invalid = false, ...rest },
  ref
) {
  const checkboxStyles = useCheckboxStyles({ invalid, checked });

  if (!label && !(rest['aria-label'] || rest['aria-labelledby'])) {
    console.error(
      'The `label` prop was omitted without providing an `aria-label` or `aria-labelledby` attribute'
    );
  }

  return (
    <PseudoBox
      as="label"
      display="inline-flex"
      alignItems="center"
      cursor="pointer"
      fontSize="medium"
      fontWeight="medium"
      verticalAlign="top"
      aria-disabled={disabled}
    >
      <PseudoBox position="relative" borderRadius="circle" p={2} {...checkboxStyles}>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked, e)}
          {...rest}
        />
      </PseudoBox>
      {label && (
        <Box as="span" userSelect="none">
          {label}
        </Box>
      )}
    </PseudoBox>
  );
});

export default React.memo(Checkbox);
