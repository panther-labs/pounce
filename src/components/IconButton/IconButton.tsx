import React from 'react';
import { css, useTheme } from '@emotion/react';
import { convertHexToRgba } from '../../utils/helpers';
import AbstractButton, { AbstractButtonProps } from '../AbstractButton';

export interface IconButtonProps extends AbstractButtonProps {
  /** Whether the component should appear as "activated". Helpful for menus */
  active?: boolean;

  /** The color variant of the IconButton */
  variant: 'primary' | 'default';
}

/** A wrapper that makes an <a href="/#/Icon">Icon<a> component be clickable */
export const IconButton: React.FC<IconButtonProps> = ({ active, variant, ...rest }) => {
  const { colors } = useTheme();

  return (
    <AbstractButton
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
      {...rest}
    />
  );
};

IconButton.defaultProps = {
  active: false,
};

export default IconButton;
