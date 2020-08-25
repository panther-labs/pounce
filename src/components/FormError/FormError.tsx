import React from 'react';
import Icon from '../Icon';
import Text, { TextProps } from '../Text';

export type FormErrorProps = TextProps;

/**
 * Extends Text
 *
 * A utility component that quickly allows you to add error messages to form fields
 */
const FormError: React.FC<FormErrorProps> = ({ children, ...rest }) => {
  return (
    <Text
      display="flex"
      alignItems="center"
      color="red-300"
      fontSize="small"
      fontStyle="italic"
      role="alert"
      {...rest}
    >
      <Icon size="small" type="warning" mr={1} flex="0 0 auto" />
      {children}
    </Text>
  );
};

export default FormError;
