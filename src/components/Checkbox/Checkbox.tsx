import React from 'react';
import Box, { ReactAttributes } from '../Box';
import PseudoBox from '../PseudoBox';
import { disabledStyles } from '../../utils/common';
import useCheckboxStyles from './useCheckboxStyles';

export type CheckboxProps = ReactAttributes<React.InputHTMLAttributes<HTMLInputElement>> & {
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
const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  readOnly = false,
  invalid = false,
  ...rest
}) => {
  const checkboxStyles = useCheckboxStyles({ invalid, checked });

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
      color="gray-50"
      verticalAlign="top"
      {...(disabled && disabledStyles)}
    >
      <PseudoBox position="relative" borderRadius="circle" p={2} {...checkboxStyles}>
        <Box
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
    </Box>
  );
};

export default Checkbox;
