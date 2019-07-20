import React from 'react';
import styled from 'styled-components';
import { convertHex } from 'utils/helpers';
import { Button as RebassButton } from 'rebass';
import Flex from './Flex';

/**
 * A wrapper that makes an Icon be clickable
 */
const IconButton: React.FC = styled(props => (
  <RebassButton bg="transparent" borderRadius="circle" width={32} height={32} {...props}>
    <Flex></Flex>
  </RebassButton>
))`
  cursor: pointer;
  transition: background-color 0.2s linear;

  [disabled] {
    opacity: 0.3;
    pointer-events: none;
  }

  &:hover {
    background-color: ${({ theme }) => convertHex(theme.colors.black, 0.9)};
  }

  &:active {
    background-color: ${({ theme }) => convertHex(theme.colors.black, 0.8)};
  }
`;

export default IconButton;
