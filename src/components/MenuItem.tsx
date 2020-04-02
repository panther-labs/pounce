import React from 'react';
import styled from '@emotion/styled';
import Box, { BoxProps } from './Box';
import Text from './Text';

const StyledBox = styled(Box)`
  transition: background-color 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, ['aria-selected']: selected }) =>
      !selected && theme.colors.grey50};
  }
`;

interface MenuItemProps extends BoxProps {
  /** Whether the current item is highlighted through the keyboard **/
  highlighted?: boolean;

  /** Whether the current item is currently selected **/
  selected?: boolean;

  /** The color style */
  variant: 'primary' | 'default';
}

/**
 * A MenuItem is simply an entry in a list of menu options or dropdown options. In general, this
 * should be used only on autocompletes, comboboxes & menus.
 */
const MenuItem: React.FC<MenuItemProps> = ({
  highlighted,
  selected,
  variant,
  children,
  ...rest
}) => {
  const styleProps = (() => {
    if (selected) {
      return {
        bg: variant === 'primary' ? 'primary50' : 'grey100',
        color: variant === 'primary' ? 'primary300' : 'grey500',
        'aria-selected': true,
      };
    }
    if (highlighted) {
      return {
        bg: 'grey50',
        color: 'grey500',
      };
    }
    return {
      bg: 'transparent',
      color: 'grey500',
      'aria-selected': false,
    };
  })() as Partial<MenuItemProps>;

  return (
    <StyledBox px={5} py={4} {...styleProps} {...rest}>
      <Text size="large">{children}</Text>
    </StyledBox>
  );
};

MenuItem.defaultProps = {
  highlighted: false,
  selected: false,
};

export default MenuItem;
