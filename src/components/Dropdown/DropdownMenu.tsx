import React from 'react';
import useDropdownAlignment from './useDropdownAlignment';
import { MenuItems as ReachMenuItems, MenuPopover as ReachMenuPopover } from '@reach/menu-button';
import Card from '../Card/Card';

export interface DropdownMenuProps {
  alignment?: 'left' | 'right' | 'match-width';
}

export const DropdownMenu = React.forwardRef<HTMLElement, DropdownMenuProps>(function DropdownMenu(
  { alignment = 'right', children },
  ref
) {
  const position = useDropdownAlignment({ alignment });

  return (
    <ReachMenuPopover position={position} ref={ref}>
      <Card
        as={ReachMenuItems}
        bg="navyblue-450"
        zIndex={99}
        mt={2}
        outline="none"
        overflow="hidden"
      >
        {children}
      </Card>
    </ReachMenuPopover>
  );
});

export default DropdownMenu;
