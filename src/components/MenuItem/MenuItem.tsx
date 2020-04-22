import React from 'react';
import Text from '../Text';
import AbstractButton, { AbstractButtonProps } from '../AbstractButton';

interface MenuItemProps extends AbstractButtonProps {
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
    <AbstractButton
      width={1}
      textAlign="left"
      px={5}
      py={4}
      _hover={{
        backgroundColor: !selected ? 'grey50' : undefined,
      }}
      {...styleProps}
      {...rest}
    >
      <Text size="large">{children}</Text>
    </AbstractButton>
  );
};

MenuItem.defaultProps = {
  highlighted: false,
  selected: false,
};

export default React.memo(MenuItem);
