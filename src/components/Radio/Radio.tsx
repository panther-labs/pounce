import React from 'react';
import Box, { NativeAttributes } from '../Box';
import PseudoBox from '../PseudoBox';
import useRadioStyles from './useRadioStyles';

export type RadioProps = NativeAttributes<'input'> & {
  /** The label associated with the Radio. Appears on the right. */
  label: string;

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
  { checked, label, disabled, invalid, hidden, readOnly, ...rest },
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
      aria-hidden={hidden}
      hidden={hidden}
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
