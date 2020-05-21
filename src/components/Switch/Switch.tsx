import React from 'react';
import Label from '../Label';
import Box from '../Box';
import Flex from '../Flex';
import AbstractButton from '../AbstractButton';

export interface SwitchProps {
  /** The text that's going to be shown when the switch is activated */
  label?: string;

  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean) => void;
}

/** An alternative to <a href="/#/Checkbox">Checkbox</a>. A simple true/false component  */
const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, ...rest }) => {
  return (
    <AbstractButton
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      borderRadius="pill"
      bg={checked ? 'primary300' : 'grey200'}
      minWidth={56}
    >
      <Flex alignItems="center">
        {checked && (
          <Label as="span" size="small" color="white" flex="1 0 auto" ml={2}>
            {label}
          </Label>
        )}
        <Box width={20} height={20} borderRadius="circle" bg="white" boxShadow="dark250" m={1} />
      </Flex>
      <Box
        as="input"
        position="absolute"
        opacity={0}
        type="checkbox"
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        {...rest}
      />
    </AbstractButton>
  );
};

Switch.defaultProps = {
  label: 'ON',
};

export default Switch;
