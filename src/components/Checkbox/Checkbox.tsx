import React from 'react';
import styled from '@emotion/styled';
import IconButton from '../IconButton';
import Icon from '../Icon';

const StyledCheckbox = styled.input`
  position: absolute;
  opacity: 0;
`;

export interface CheckboxProps {
  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean, e: React.SyntheticEvent) => void;
}

/* Your bread & butter checkbox element. Nothing new here */
const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, ...rest }) => {
  return (
    <IconButton
      type="button"
      variant="default"
      role="checkbox"
      aria-checked={checked}
      onClick={(e: React.MouseEvent) => onChange(!checked, e)}
    >
      <Icon
        size="small"
        type={checked ? 'checkbox-selected' : 'checkbox'}
        color={checked ? 'primary300' : 'grey400'}
      />
      <StyledCheckbox
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked, e)}
        {...rest}
      />
    </IconButton>
  );
};

export default Checkbox;