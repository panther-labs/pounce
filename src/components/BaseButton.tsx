import React from 'react';
import styled from 'styled-components';
import Box, { BoxProps } from 'components/Box';

export interface BaseButtonProps extends BoxProps<HTMLButtonElement> {
  /** Whether the element should be disabled */
  disabled?: boolean;
}

const BaseButton = styled<React.FC<BaseButtonProps>>(props => <Box is="button" {...props} />)`
  cursor: pointer;
  transition: all 0.1s linear;

  &[disabled] {
    opacity: 0.3;
    pointer-events: none;
    box-shadow: none;
  }
`;

BaseButton.defaultProps = {
  disabled: false,
};

export default BaseButton;
