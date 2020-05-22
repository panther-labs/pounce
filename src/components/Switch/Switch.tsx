import React from 'react';
import Box from '../Box';
import Flex from '../Flex';
import { disabledStyles } from '../../utils/common';

export interface SwitchProps {
  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** Whether the checkbox is currently disabled */
  disabled?: boolean;

  /** The label associated with the Switch. Appears on the right. */
  label?: string;

  /** The text to show when the switch is checked */
  checkedText?: string;

  /** The text to show when the switch is unchecked */
  uncheckedText?: string;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean, e: React.SyntheticEvent) => void;
}

/* Your bread & butter checkbox element. Nothing new here */
const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  checkedText = 'ON',
  uncheckedText = 'OFF',
  disabled,
  label,
  ...rest
}) => {
  return (
    <Box
      as="label"
      display="inline-flex"
      alignItems="center"
      cursor="pointer"
      fontSize="medium"
      color="white"
      {...(disabled && disabledStyles)}
    >
      {label && (
        <Box as="span" userSelect="none" mr={2}>
          {label}
        </Box>
      )}
      <Flex
        align="center"
        justify="space-between"
        direction={checked ? 'row-reverse' : 'row'}
        borderRadius="pill"
        width={54}
        height={27}
        p={1}
        transition="background-color 0.15s linear"
        backgroundColor={checked ? 'blue-600' : 'gray-700'}
      >
        <Box as="span" width={21} height={21} borderRadius="circle" bg="white" flexShrink={0} />
        <Box as="span" fontWeight="bold" fontSize="x-small" userSelect="none" mx={1}>
          {checked ? checkedText : uncheckedText}
        </Box>
        <Box
          as="input"
          position="absolute"
          opacity={0}
          type="checkbox"
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked, e)}
          {...rest}
        />
      </Flex>
    </Box>
  );
};

export default Switch;
