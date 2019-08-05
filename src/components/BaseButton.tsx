import React from 'react';
import styled from 'styled-components';
import Box, { BoxProps } from 'components/Box';

export interface BaseButtonProps extends BoxProps<HTMLButtonElement> {
  /** Whether the element should be disabled */
  disabled?: boolean;
}

const BaseButton = styled(props => <Box as="button" {...props} />)<BaseButtonProps>`
  cursor: pointer;
  transition: background-color 0.15s linear;

  [disabled] {
    opacity: 0.3;
    pointer-events: none;
  }
`;

BaseButton.defaultProps = {
  disabled: false,
};

export default BaseButton;
