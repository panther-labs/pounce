import React from 'react';
import { css } from 'styled-components';
import Box, { BoxProps } from 'components/Box';
import Text from 'components/Text';

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
  css: userCssProp,
  children,
  ...rest
}) => {
  const styleProps = (() => {
    if (selected) {
      return {
        bg: variant === 'primary' ? 'primary50' : 'grey100',
        color: variant === 'primary' ? 'primary300' : 'grey500',
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
    };
  })();

  const inlineStyles = css`
    ${userCssProp};
    transition: background-color 0.1s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => !selected && theme.colors.grey50};
    }
  `;

  return (
    <Box px={5} py={4} css={inlineStyles} {...styleProps} {...rest}>
      <Text size="large">{children}</Text>
    </Box>
  );
};

MenuItem.defaultProps = {
  highlighted: false,
  selected: false,
};

export default MenuItem;
