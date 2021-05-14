import { MenuLink as ReachMenuLink, MenuLinkProps as ReachMenuLinkProps } from '@reach/menu-button';
import MenuItem from '../utils/MenuItem/MenuItem';
import React from 'react';

export type DropdownLinkProps = ReachMenuLinkProps;

export const DropdownLink: React.FC<DropdownLinkProps & { disabled?: boolean }> = ({
  children,
  disabled,
  ...rest
}) => {
  return (
    <ReachMenuLink disabled={disabled} as="a" {...rest}>
      <MenuItem disabled={disabled}>{children}</MenuItem>
    </ReachMenuLink>
  );
};

export default DropdownLink;
