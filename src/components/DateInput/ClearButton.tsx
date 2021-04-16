import React from 'react';
import AbstractButton, { AbstractButtonProps } from '../AbstractButton';

const TextButton: React.FC<AbstractButtonProps> = props => {
  return (
    <AbstractButton
      textDecoration="underline"
      fontSize="small"
      color="gray-300"
      sx={{
        '&:hover': {
          textDecoration: 'none',
        },
      }}
      {...props}
    />
  );
};

export default TextButton;
