import React from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import Icon from './Icon';

const StyledCheckbox = styled.input`
  position: absolute;
  opacity: 0;
`;

export interface CheckboxProps {
  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, ...rest }) => {
  return (
    <IconButton role="checkbox" aria-checked={checked} onClick={() => onChange(!checked)}>
      <Icon
        type={checked ? 'checkbox-selected' : 'checkbox'}
        color={checked ? 'primary300' : 'grey400'}
      />
      <StyledCheckbox
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        {...rest}
      />
    </IconButton>
  );
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
