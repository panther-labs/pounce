import React from 'react';
import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import { NativeAttributes } from '../Box';

export type DropdownButtonProps = NativeAttributes<'button'>;
export const DropdownButton = ReachMenuButton as React.ForwardRefRenderFunction<
  'button',
  DropdownButtonProps
>;

export default DropdownButton;
