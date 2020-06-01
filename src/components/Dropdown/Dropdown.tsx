import React from 'react';
import { forwardRefWithAs } from '@reach/utils';
import {
  Menu as ReachMenu,
  MenuItem as ReachMenuItem,
  MenuLink as ReachMenuLink,
  MenuPopover as ReachMenuPopover,
  MenuItems as ReachMenuItems,
  MenuButton as ReachMenuButton,
  MenuLinkProps as ReachMenuLinkProps,
} from '@reach/menu-button';
import useDropdownAlignment from './useDropdownAlignment';
import Card from '../Card';
import MenuItem from '../utils/MenuItem';

export interface DropdownMenuProps {
  alignment?: 'left' | 'right' | 'match-width';
}

export const Dropdown = ReachMenu;

export const DropdownButton = ReachMenuButton;

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ alignment = 'right', children }) => {
  const position = useDropdownAlignment({ alignment });

  return (
    <ReachMenuPopover position={position}>
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
};

export const DropdownItem = forwardRefWithAs<ReachMenuLinkProps & { disabled?: boolean }, 'div'>(
  function DropdownItem({ children, onSelect = () => {}, disabled, ...rest }, ref) {
    if (disabled) {
      return <MenuItem disabled>{children}</MenuItem>;
    }

    return (
      <ReachMenuItem onSelect={onSelect} ref={ref} {...rest}>
        <MenuItem>{children}</MenuItem>
      </ReachMenuItem>
    );
  }
);

export const DropdownLink = forwardRefWithAs<ReachMenuLinkProps & { disabled?: boolean }, 'a'>(
  function DropdownLink({ children, disabled, ...rest }, ref) {
    if (disabled) {
      return <MenuItem disabled>{children}</MenuItem>;
    }

    return (
      <ReachMenuLink ref={ref} {...rest}>
        <MenuItem disabled={disabled}>{children}</MenuItem>
      </ReachMenuLink>
    );
  }
);
