import React from 'react';
import styled from 'styled-components';
import * as StyledSystem from 'styled-system';
import Box, { BoxProps } from './Box';

export interface BaseButtonProps extends BoxProps, StyledSystem.ShadowProps {}

const BaseButton = styled(props => <Box as="button" border="none" {...props} />)<BaseButtonProps>`
  ${StyledSystem.shadow};
  cursor: pointer;
  transition: background-color 0.15s linear;

  [disabled] {
    opacity: 0.3;
    pointer-events: none;
  }
`;

export default BaseButton;
