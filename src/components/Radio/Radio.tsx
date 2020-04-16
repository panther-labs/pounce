import React from 'react';
import IconButton from '../IconButton';
import Icon from '../Icon';
import Box from '../Box';

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
      <Box
        as="input"
        position="absolute"
        opacity={0}
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        {...rest}
      />
    </IconButton>
  );
};

Radio.defaultProps = {
  checked: false,
};

export default Radio;
