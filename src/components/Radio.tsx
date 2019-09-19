import React from 'react';
import styled from 'styled-components';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';

const StyledRadio = styled.input`
  position: absolute;
  opacity: 0;
`;

export interface RadioProps {
  /** Whether the checkbox should be checked or not */
  checked: boolean;

  /** What happens when the value of the checkbox changes */
  onChange: (checked: boolean) => void;
}

/** The typical Radio element that you know from school */
const Radio: React.FC<RadioProps> = ({ checked, onChange, ...rest }) => {
  return (
    <IconButton
      type="button"
      variant="default"
      role="radio"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <Icon
        size="small"
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
