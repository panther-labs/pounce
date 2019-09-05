import React from 'react';
import styled from 'styled-components';
import Box, { BoxProps } from 'components/Box';
import { textDecoration } from '../extensions';
import * as CSS from 'csstype';

export interface BaseButtonProps extends BoxProps<HTMLButtonElement> {
  /** Whether the element should be disabled */
  disabled?: boolean;

  /** The standard text-decoration CSS property */
  textDecoration?: CSS.StandardShorthandProperties['textDecoration'];
}

const BaseButton = styled<React.FC<BaseButtonProps>>(props => <Box is="button" {...props} />)`
  ${textDecoration};

  cursor: pointer;
  transition: all 0.1s linear;

  &[disabled] {
    opacity: 0.3;
    pointer-events: none;
    cursor: default;
  }
`;

BaseButton.defaultProps = {
  disabled: false,
};

export default BaseButton;
