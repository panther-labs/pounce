import React from 'react';
import styled from 'styled-components';
import Box, { BoxProps } from 'components/Box';

export { BoxProps as BaseButtonProps };

const BaseButton = styled(props => <Box as="button" border="none" p={0} m={0} {...props} />)<
  BoxProps
>`
  cursor: pointer;
  transition: background-color 0.15s linear;

  [disabled] {
    opacity: 0.3;
    pointer-events: none;
  }
`;

export default BaseButton;
