import React from 'react';
import { css } from '@emotion/core';
import Box, { BoxProps } from 'components/Box';

export interface BaseButtonProps extends BoxProps<HTMLButtonElement> {
  /** Whether the element should be disabled */
  disabled?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = props => (
  <Box
    {...props}
    is="button"
    css={css`
      cursor: pointer;
      transition: all 0.1s linear;

      &[disabled] {
        opacity: 0.3;
        pointer-events: none;
        cursor: default;
      }
    `}
  />
);

BaseButton.defaultProps = {
  disabled: false,
};

export default BaseButton;
