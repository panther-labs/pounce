import React from 'react';
import { Theme } from '../../../theme';
import Box from '../../Box';
import { NativeAttributes } from '../../../system';

interface MenuItemProps extends NativeAttributes<'div'> {
  /** Whether the current item is currently selected **/
  selected?: boolean;

  /** Whether the particular item should be disabled */
  disabled?: boolean;

  /** @ignore */
  children: React.ReactNode;
}

/**
 * A MenuItem is simply an entry in a list of menu options or dropdown options. In general, this
 * should be used only on autocompletes, comboboxes & menus.
 */
const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { selected, disabled, children, ...rest },
  ref
) {
  let backgroundColor: keyof Theme['colors'] = 'navyblue-300';
  if (selected) {
    backgroundColor = 'navyblue-500';
  }

  return (
    <Box
      ref={ref}
      cursor="pointer"
      fontSize="medium"
      py={4}
      pl={4}
      pr={!selected ? 4 : 10}
      transition="background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
      position="relative"
      backgroundColor={backgroundColor}
      aria-disabled={disabled}
      sx={{
        // Fixes an issue with @reach/menu-button, because the `as` prop isn't working as expected
        '[data-selected] > &': {
          backgroundColor: 'navyblue-400',
        },
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
});

export default React.memo(MenuItem);
