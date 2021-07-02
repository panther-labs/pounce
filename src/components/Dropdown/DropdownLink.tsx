import React from 'react';
import { MenuLink as ReachMenuLink, MenuLinkProps as ReachMenuLinkProps } from '@reach/menu-button';
import type * as Polymorphic from '@reach/utils/polymorphic';
import MenuItem from 'components/utils/MenuItem';

export type DropdownLinkProps = ReachMenuLinkProps;

export const DropdownLink = React.forwardRef(function DropdownLink(
  { children, disabled, ...rest },
  ref
) {
  return (
    <ReachMenuLink disabled={disabled} ref={ref} {...rest}>
      <MenuItem disabled={disabled}>{children}</MenuItem>
    </ReachMenuLink>
  );
}) as Polymorphic.ForwardRefComponent<'a', DropdownLinkProps>;

export default DropdownLink;
