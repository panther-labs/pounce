import React from 'react';
import styled from 'styled-components';
import BaseButton from 'components/BaseButton';
import Label from 'components/Label';
import Box from 'components/Box';
import Flex from 'components/Flex';

const StyledSwitch = styled.input`
  position: absolute;
  opacity: 0;
`;

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
    <BaseButton
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      borderRadius="large"
      bg={checked ? 'primary300' : 'grey200'}
      minWidth={56}
    >
      <Flex alignItems="center">
        {checked && (
          <Label is="span" size="small" color="white" flex="1 0 auto" ml={2}>
            {label}
          </Label>
        )}
        <Box width={20} height={20} borderRadius="circle" bg="white" boxShadow="dark250" m={1} />
      </Flex>
      <StyledSwitch
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        {...rest}
      />
    </BaseButton>
  );
};

Switch.defaultProps = {
  label: 'ON',
};

export default Switch;
