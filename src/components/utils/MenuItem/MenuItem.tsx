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

  /** Whether a check mark icon should be displayed when the item is selected */
  withCheckMark?: boolean;

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
  withCheckMark,
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
      pr={4}
      pl={nested ? 22 : 4}
      transition="background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
      position="relative"
      backgroundColor={bgColor}
      aria-disabled={disabled}
      _selected={{
        backgroundColor: 'navyblue-400',
      }}
      whiteSpace="nowrap"
      {...(withCheckMark && {
        pr: 10,
        _after: {
          content: selected
            ? `url( 'data:image/svg+xml; utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 18" fill="white"><path d="M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42L7 14.17z" /></svg>' )`
            : `""`,
          border: '1px solid',
          borderColor: selected ? 'blue-400' : 'navyblue-100',
          borderRadius: 'small',
          position: 'absolute',
          width: '20px',
          height: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          right: 4,
          bottom: 0,
          margin: 'auto 0',
        },
      })}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default React.memo(MenuItem);
