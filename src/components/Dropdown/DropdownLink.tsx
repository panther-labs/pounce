import { forwardRefWithAs } from '@reach/utils';
import { MenuLink as ReachMenuLink, MenuLinkProps as ReachMenuLinkProps } from '@reach/menu-button';
import MenuItem from '../utils/MenuItem/MenuItem';
import React from 'react';

export type DropdownLinkProps = ReachMenuLinkProps;

export const DropdownLink = forwardRefWithAs<DropdownLinkProps & { disabled?: boolean }, 'a'>(
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

export default DropdownLink;
