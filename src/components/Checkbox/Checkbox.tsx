import React from 'react';
import Box, { ReactAttributes } from '../Box';
import { addOpacity } from '../../utils/helpers';
import PseudoBox from '../PseudoBox';
import { disabledStyles } from '../../utils/common';

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
          content: `url( 'data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 18" fill="white"><path d="M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42L7 14.17z" /></svg>' )`,
          display: 'block',
          position: 'absolute',
          width: 'fit-content',
          height: 'fit-content',
          opacity: checked ? 1 : 0,
          transition: 'opacity 125ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 'auto',
        }}
        _after={{
          content: '""',
          display: 'block',
          width: 26,
          height: 26,
          border: '1px solid',
          borderRadius: 'small',
          transition: 'border-color 125ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          borderColor: invalid ? 'red-200' : checked ? 'blue-600' : 'navyblue-450',
        }}
      >
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
