import React from 'react';
import Box, { ReactAttributes } from '../Box';
import PseudoBox from '../PseudoBox';
import { disabledStyles } from '../../utils/common';
import useRadioStyles from './useRadioStyles';

export type RadioProps = ReactAttributes<React.InputHTMLAttributes<HTMLInputElement>> & {
  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** The label associated with the Radio. Appears on the right. */
  label: string;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean, e: React.SyntheticEvent) => void;

  /** Whether the checkbox is currently disabled */
  disabled?: boolean;

  /**  Whether the input has an invalid value or not */
  invalid?: boolean;
};

/**
 *  A Radio is a typical `radio` input. Under the hood it renders a typical `radio` element, so you
 *  can pass it as many native attrs as you wish.
 */
const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  invalid = false,
  readOnly = false,
  ...rest
}) => {
  const radioStyles = useRadioStyles({ invalid, checked });

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
      <PseudoBox position="relative" borderRadius="circle" p={2} {...radioStyles}>
        <Box
          as="input"
          position="absolute"
          cursor="pointer"
          opacity={0}
          type="radio"
          readOnly={readOnly}
          aria-readonly={readOnly}
          aria-checked={checked}
          aria-invalid={invalid}
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

export default Radio;
