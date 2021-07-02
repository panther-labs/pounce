import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import type * as Polymorphic from '@reach/utils/polymorphic';
import { NativeAttributes } from 'components/Box';

export type DropdownButtonProps = NativeAttributes<'button'>;
export const DropdownButton = ReachMenuButton as Polymorphic.ForwardRefComponent<
  'button',
  DropdownButtonProps
>;

export default DropdownButton;
