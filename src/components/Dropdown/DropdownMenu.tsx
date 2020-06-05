import React from 'react';
import useDropdownAlignment from './useDropdownAlignment';
import { MenuItems as ReachMenuItems, MenuPopover as ReachMenuPopover } from '@reach/menu-button';
import Box from '../Box';

export interface DropdownMenuProps {
  /** The position of the menu */
  alignment?: 'left' | 'right' | 'match-width';
}

export const DropdownMenu = React.forwardRef<HTMLElement, DropdownMenuProps>(function DropdownMenu(
  { alignment = 'right', children },
  ref
) {
  const position = useDropdownAlignment({ alignment });

  return (
    <ReachMenuPopover position={position} ref={ref}>
      <Box
        as={ReachMenuItems}
        bg="navyblue-450"
        borderRadius="medium"
        zIndex={99}
        mt={2}
        outline="none"
        overflow="hidden"
      >
        {children}
      </Box>
    </ReachMenuPopover>
  );
});

export default DropdownMenu;
