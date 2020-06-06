import React from 'react';
import Box, { NativeAttributes } from '../Box';
import PseudoBox from '../PseudoBox';
import useRadioStyles from './useRadioStyles';

export type RadioProps = NativeAttributes<'input'> & {
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
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { checked, onChange, label, disabled = false, invalid = false, readOnly = false, ...rest },
  ref
) {
  const radioStyles = useRadioStyles({ invalid, checked });

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
      <PseudoBox position="relative" borderRadius="circle" p={2} {...radioStyles}>
        <Box
          ref={ref}
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
    </PseudoBox>
  );
});

export default React.memo(Radio);
