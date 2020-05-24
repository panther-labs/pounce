import React from 'react';
import Flex from '../Flex';
import Icon from '../Icon';

const ErrorMessage: React.FC = ({ children, ...rest }) => (
  <Flex as="p" alignItems="center" color="red-200" fontSize="small" fontStyle="italic" {...rest}>
    <Icon size="small" type="warning" mr={1} flex="0 0 auto" />
    {children}
  </Flex>
);

export default ErrorMessage;
