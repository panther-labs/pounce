import React from 'react';
import {
  Menu as ReachMenu,
  MenuList as ReachMenuList,
  MenuItem as ReachMenuItem,
  MenuButton as ReachMenuButton,
} from '@reach/menu-button';
import Card, { CardProps } from 'components/Card';

export interface DropdownProps extends CardProps {
  /** The element that will toggle (open/close) the dropdown.  */
  trigger: React.ReactNode;
}

/**
 * A dropdown is simply a menu that opens up when a certain element is clicked on the screen. It's
 * similar to a popup with the difference that it's a menu which holds a set of clickable items
 * inside it.
 */
export const Dropdown: React.FC<DropdownProps> & { Item: typeof ReachMenuItem } = ({
  trigger,
  children,
  ...rest
}) => (
  <ReachMenu>
    <ReachMenuButton>{trigger}</ReachMenuButton>
    <Card is={ReachMenuList} position="absolute" top="100%" left={0} zIndex={99} mt={2} {...rest}>
      {children}
    </Card>
  </ReachMenu>
);

Dropdown.Item = ReachMenuItem;

export default Dropdown;
