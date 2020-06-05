import React from 'react';
import Icon from '../Icon';
import Flex, { FlexProps } from '../Flex';

export type FormErrorProps = FlexProps;

/**
 * Extends Box
 *
 * A utility component that quickly allows you to add error messages to form fields
 */
const FormError: React.FC<FormErrorProps> = ({ children, ...rest }) => {
  return (
    <Flex
      as="p"
      alignItems="center"
      color="red-200"
      fontSize="small"
      fontStyle="italic"
      role="alert"
      {...rest}
    >
      <Icon size="small" type="warning" mr={1} flex="0 0 auto" />
      {children}
    </Flex>
  );
};

export default FormError;
