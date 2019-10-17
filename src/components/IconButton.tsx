import React from 'react';
import { css } from '@emotion/core';
import { convertHexToRgba } from 'utils/helpers';
import BaseButton, { BaseButtonProps } from 'components/BaseButton';
import useTheme from 'utils/useTheme';

export interface IconButtonProps extends BaseButtonProps {
  /** Whether the component should appear as "activated". Helpful for menus */
  active?: boolean;

  /** The color variant of the IconButton */
  variant: 'primary' | 'default';
}

/** A wrapper that makes an <a href="/#/Icon">Icon<a> component be clickable */
export const IconButton: React.FC<IconButtonProps> = ({ active, variant, ...rest }) => {
  const { colors } = useTheme();

  return (
    <BaseButton
      {...rest}
      bg="transparent"
      p={3}
      borderRadius="circle"
      css={css`
        color: ${active
          ? colors[variant === 'primary' ? 'primary300' : 'grey400']
          : colors.grey400};

        background-color: ${active &&
          convertHexToRgba(colors[variant === 'primary' ? 'primary300' : 'black'], 0.2)};

        &:hover:not(:active) {
          background-color: ${!active &&
            convertHexToRgba(colors[variant === 'primary' ? 'primary300' : 'black'], 0.1)};
        }

        &:active {
          background-color: ${convertHexToRgba(
            colors[variant === 'primary' ? 'primary300' : 'black'],
            0.2
          )};
        }
      `}
    />
  );
};

IconButton.defaultProps = {
  active: false,
};

export default IconButton;
