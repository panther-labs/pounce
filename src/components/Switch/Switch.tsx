import { useId } from '@reach/auto-id';
import React from 'react';
import { theme } from '../../theme';
import Box, { NativeAttributes } from '../Box';
import Flex from '../Flex';

export type SwitchProps = NativeAttributes<'input'> & {
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

const switchFocusStyles = {
  outline: `1px solid ${theme.colors['blue-200']}`,
};

/**
 *  A Switch is a typical Checkbox with a different UI. It's mainly used for settings pages, when
 *  enabling or disabling feature
 */
const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    checked,
    label,
    checkedText = 'ON',
    uncheckedText = 'OFF',
    disabled,
    invalid,
    readOnly,
    hidden,
    id,
    ...rest
  },
  ref
) {
  const inputId = useId(id);
  if (!label && !(rest['aria-label'] || rest['aria-labelledby'])) {
    console.error(
      'The `label` prop was omitted without providing an `aria-label` or `aria-labelledby` attribute'
    );
  }

  return (
    <Box
      as="span"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      fontSize="medium"
      aria-disabled={disabled}
      hidden={hidden}
      aria-hidden={hidden}
    >
      {label && (
        <Box as="label" userSelect="none" mr={2} htmlFor={inputId}>
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
        backgroundColor={invalid ? 'red-300' : checked ? 'blue-400' : 'gray-600'}
        _focusWithin={switchFocusStyles}
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
          height="100%"
          width="100%"
          top={0}
          left={0}
          margin="auto"
          opacity={0}
          type="checkbox"
          readOnly={readOnly}
          aria-readonly={readOnly}
          aria-checked={checked}
          aria-invalid={invalid}
          checked={checked}
          disabled={disabled}
          id={inputId}
          {...rest}
        />
      </Flex>
    </Box>
  );
});

export default React.memo(Switch);
