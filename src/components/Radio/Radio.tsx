import React from 'react';
import Box, { BoxProps, ReactAttributes } from '../Box';
import { addOpacity } from '../../utils/helpers';
import PseudoBox from '../PseudoBox';
import { disabledStyles } from '../../utils/common';

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
      <PseudoBox
        position="relative"
        borderRadius="circle"
        p={2}
        transition="background-color 0.15s linear"
        _hover={{
          backgroundColor: addOpacity('navyblue-450', 0.2),
          ':after': {
            borderColor: invalid ? 'red-200' : 'blue-600',
          },
        }}
        _focusWithin={{
          backgroundColor: addOpacity('navyblue-450', 0.2),
          ':after': {
            borderColor: invalid ? 'red-200' : 'blue-600',
          },
        }}
        _before={{
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: checked ? 1 : 0,
          transition: 'opacity 125ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          right: 0,
          bottom: 0,
          margin: 'auto',
          width: 12,
          height: 12,
          backgroundColor: 'white',
          borderRadius: 'circle',
        }}
        _after={{
          content: '""',
          display: 'block',
          width: 26,
          height: 26,
          border: '1px solid',
          borderRadius: 'circle',
          transition: 'border-color 125ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          borderColor: invalid ? 'red-200' : checked ? 'blue-600' : 'navyblue-450',
        }}
      >
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
