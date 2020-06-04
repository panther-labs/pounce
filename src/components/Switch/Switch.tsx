import React from 'react';
import Box, { ReactAttributes } from '../Box';
import Flex from '../Flex';
import { disabledStyles } from '../../utils/common';

export type SwitchProps = ReactAttributes<React.InputHTMLAttributes<HTMLInputElement>> & {
  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean, e: React.SyntheticEvent) => void;

  /** Whether the checkbox is currently disabled */
  disabled?: boolean;

  /**  Whether the input has an invalid value or not */
  invalid?: boolean;

  /** The label associated with the Switch. Appears on the right. */
  label?: string;

  /** The text to show when the switch is checked */
  checkedText?: string;

  /** The text to show when the switch is unchecked */
  uncheckedText?: string;
};

/**
 *  A Switch is a typical Checkbox with a different UI. It's mainly used for settings pages, when
 *  enabling or disabling feature
 */
const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    checked,
    onChange,
    label,
    checkedText = 'ON',
    uncheckedText = 'OFF',
    disabled = false,
    invalid = false,
    readOnly = false,
    ...rest
  },
  ref
) {
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
      {...(disabled && disabledStyles)}
    >
      {label && (
        <Box as="span" userSelect="none" mr={2}>
          {label}
        </Box>
      )}
      <Flex
        position="relative"
        align="center"
        borderRadius="pill"
        width={54}
        height={27}
        p={1}
        transition="background-color 0.15s linear"
        backgroundColor={invalid ? 'red-200' : checked ? 'blue-600' : 'gray-700'}
      >
        <Box
          width={21}
          height={21}
          borderRadius="circle"
          bg="white"
          transform={checked ? 'translate3D(120%, 0, 0)' : 'translate3D(0, 0, 0)'}
          transition="transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
        />
        <Box
          fontWeight="bold"
          fontSize="x-small"
          userSelect="none"
          mx="7px"
          position="absolute"
          left={checked ? 0 : undefined}
          right={!checked ? 0 : undefined}
        >
          {checked ? checkedText : uncheckedText}
        </Box>
        <Box
          ref={ref}
          as="input"
          cursor="pointer"
          position="absolute"
          opacity={0}
          type="checkbox"
          readOnly={readOnly}
          aria-readonly={readOnly}
          aria-checked={checked}
          aria-invalid={invalid}
          checked={checked}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked, e)}
          {...rest}
        />
      </Flex>
    </Box>
  );
});

export default Switch;
