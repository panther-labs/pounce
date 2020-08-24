import React from 'react';
import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import { ComponentWithAs } from '@reach/utils';

export type DropdownButtonProps = React.ComponentProps<'button'>;
export const DropdownButton = ReachMenuButton as ComponentWithAs<'button', DropdownButtonProps>;

export default DropdownButton;
