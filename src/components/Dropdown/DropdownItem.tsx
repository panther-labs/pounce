import { MenuItem as ReachMenuItem, MenuLinkProps as ReachMenuLinkProps } from '@reach/menu-button';
import MenuItem from '../utils/MenuItem/MenuItem';
import React from 'react';

export type DropdownItemProps = ReachMenuLinkProps; // this is not a typo, it's intentional

export const DropdownItem: React.FC<DropdownItemProps & { disabled?: boolean }> = ({
  children,
  onSelect = () => {},
  disabled,
  ...rest
}) => {
  return (
    <ReachMenuItem disabled={disabled} onSelect={onSelect} as="div" {...rest}>
      <MenuItem disabled={disabled}>{children}</MenuItem>
    </ReachMenuItem>
  );
};

export default DropdownItem;
