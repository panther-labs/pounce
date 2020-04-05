import React from 'react';
import { css } from '@emotion/react';
import Box, { BoxProps } from '../Box';

export type BaseButtonProps = BoxProps<React.ButtonHTMLAttributes<HTMLButtonElement>> & {
  /** Whether the element should be disabled */
  disabled?: boolean;
};

const BaseButton: React.FC<BaseButtonProps> = props => (
  <Box
    type="button"
    as="button"
    css={css`
      cursor: pointer;
      text-decoration: none;
      transition: all 0.1s linear;

      &[disabled] {
        opacity: 0.3;
        pointer-events: none;
        cursor: default;
      }
    `}
    {...props}
  />
);

BaseButton.defaultProps = {
  disabled: false,
};

export default BaseButton;
