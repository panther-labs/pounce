import React from 'react';
import Box from '../Box';
import { PseudoBoxProps } from '../PseudoBox';
import { disabledStyles } from '../../utils/common';
import { slugify } from '../../utils/helpers';
import InputWrapper from './InputWrapper';
import InputLabel from './InputLabel';
import InputElement from './InputElement';

export type AbstractInputProps = PseudoBoxProps & {
  /** The style of the input */
  variant: 'outlined' | 'filled';

  /** The label that is associated with this input */
  label: string;

  /** Whether the input has an invalid value */
  invalid?: boolean;
};

const AbstractInput: React.FC<AbstractInputProps> = ({
  label,
  invalid,
  disabled,
  variant = 'outlined',
  id,
  name,
  value,
  ...rest
}) => {
  const identifier = id || name || slugify(label);

  return (
    <Box {...(disabled && disabledStyles)}>
      <InputWrapper variant={variant} invalid={invalid}>
        <InputElement disabled={disabled} id={identifier} name={name} value={value} {...rest} />
        <InputLabel raised={!!value} invalid={invalid} htmlFor={identifier}>
          {label}
        </InputLabel>
      </InputWrapper>
    </Box>
  );
};

export default AbstractInput;
