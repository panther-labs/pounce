import React from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';
import Icon from './Icon';

const StyledRadio = styled.input`
  position: absolute;
  opacity: 0;
`;

//<input type="checkbox" name="vehicle3" value="Boat" checked> I have a boat<br>

export interface RadioProps {
  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean) => void;
}

const Radio: React.FC<RadioProps> = ({ checked, onChange, ...rest }) => {
  return (
    <IconButton role="radio" aria-checked={checked} onClick={() => onChange(!checked)}>
      <Icon
        type={checked ? 'radio-selected' : 'radio'}
        color={checked ? 'primary300' : 'grey400'}
      />
      <StyledRadio
        type="radio"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        {...rest}
      />
    </IconButton>
  );
};

Radio.defaultProps = {
  checked: false,
};

export default Radio;
