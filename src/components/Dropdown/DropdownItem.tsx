import { forwardRefWithAs } from '@reach/utils';
import { MenuItem as ReachMenuItem, MenuLinkProps as ReachMenuLinkProps } from '@reach/menu-button';
import MenuItem from '../utils/MenuItem/MenuItem';
import React from 'react';

export type DropdownItemProps = ReachMenuLinkProps; // this is not a typo, it's intentional

export const DropdownItem = forwardRefWithAs<DropdownItemProps & { disabled?: boolean }, 'div'>(
  function DropdownItem({ children, onSelect = () => {}, disabled, ...rest }, ref) {
    return (
      <ReachMenuItem disabled={disabled} onSelect={onSelect} ref={ref} {...rest}>
        <MenuItem>{children}</MenuItem>
      </ReachMenuItem>
    );
  }
);

export default DropdownItem;
