import React from 'react';
import { MenuItem as ReachMenuItem, MenuLinkProps as ReachMenuLinkProps } from '@reach/menu-button';
import type * as Polymorphic from '@reach/utils/polymorphic';
import MenuItem from '../utils/MenuItem/MenuItem';

export type DropdownItemProps = ReachMenuLinkProps; // this is not a typo, it's intentional

export const DropdownItem = React.forwardRef(function DropdownItem(
  { children, onSelect = () => {}, disabled, ...rest },
  ref
) {
  return (
    <ReachMenuItem disabled={disabled} onSelect={onSelect} ref={ref} {...rest}>
      <MenuItem disabled={disabled}>{children}</MenuItem>
    </ReachMenuItem>
  );
}) as Polymorphic.ForwardRefComponent<'div', DropdownItemProps>;

export default DropdownItem;
