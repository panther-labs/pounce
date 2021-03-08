import React from 'react';
import { Theme } from '../../../theme';
import Box, { NativeAttributes } from '../../Box';

interface MenuItemProps extends NativeAttributes<'div'> {
  /** Whether the current item is currently selected **/
  selected?: boolean;

  /** Whether the particular item should be disabled */
  disabled?: boolean;

  /** Whether the item is nested in a group or not */
  nested?: boolean;

  /** The background color of the menu item */
  backgroundColor?: keyof Theme['colors'];

  /** The background color when the item is selected */
  selectedBackgroundColor?: keyof Theme['colors'];

  /** @ignore */
  children: React.ReactNode;
}

/**
 * A MenuItem is simply an entry in a list of menu options or dropdown options. In general, this
 * should be used only on autocompletes, comboboxes & menus.
 */
const MenuItem: React.FC<MenuItemProps> = ({
  selected,
  disabled,
  nested,
  backgroundColor = 'navyblue-300',
  selectedBackgroundColor = 'navyblue-500',
  children,
  ...rest
}) => {
  let bgColor = backgroundColor;
  if (selected) {
    bgColor = selectedBackgroundColor;
  }

  return (
    <Box
      cursor="pointer"
      fontSize="medium"
      py={4}
      pl={nested ? 22 : 4}
      pr={!selected ? 4 : 10}
      transition="background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
      position="relative"
      backgroundColor={bgColor}
      aria-disabled={disabled}
      _selected={{
        backgroundColor: 'navyblue-400',
      }}
      _after={{
        content: `url( 'data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 18" fill="white"><path d="M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42L7 14.17z" /></svg>' )`,
        display: selected ? 'block' : 'none',
        position: 'absolute',
        width: 'fit-content',
        height: 'fit-content',
        top: 0,
        right: 4,
        bottom: 0,
        margin: 'auto 0',
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default React.memo(MenuItem);
