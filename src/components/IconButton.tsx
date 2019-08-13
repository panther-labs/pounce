import React from 'react';
import styled from 'styled-components';
import { convertHexToRgba } from 'utils/helpers';
import forwardAs from 'utils/forwardAs';
import BaseButton, { BaseButtonProps } from 'components/BaseButton';

export interface IconButtonProps extends BaseButtonProps {
  /** Whether the component should appear as "activated". Helpful for menus */
  active?: boolean;

  /** The color variant of the IconButton */
  variant: 'primary' | 'default';
}

/** A wrapper that makes an <a href="/#/Icon">Icon<a> component be clickable */
export const IconButton = forwardAs(styled<React.FC<IconButtonProps>>(
  forwardAs(props => <BaseButton bg="transparent" p={3} borderRadius="circle" {...props} />)
)`
  color: ${({ theme, active, variant }) =>
    active ? theme.colors[variant === 'primary' ? 'primary300' : 'grey400'] : theme.colors.grey400};

  background-color: ${({ theme, active, variant }) =>
    active && convertHexToRgba(theme.colors[variant === 'primary' ? 'primary300' : 'black'], 0.2)};

  &:hover:not(:active) {
    background-color: ${({ theme, variant, active }) =>
      !active &&
      convertHexToRgba(theme.colors[variant === 'primary' ? 'primary300' : 'black'], 0.1)};
  }

  &:active {
    background-color: ${({ theme, variant }) =>
      convertHexToRgba(theme.colors[variant === 'primary' ? 'primary300' : 'black'], 0.2)};
  }
`);

IconButton.defaultProps = {
  active: false,
};

export default IconButton;
