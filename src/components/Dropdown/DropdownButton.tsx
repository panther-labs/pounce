import { MenuButton as ReachMenuButton } from '@reach/menu-button';
import { ComponentWithAs } from '@reach/utils';
import { NativeAttributes } from '../../system';

export type DropdownButtonProps = NativeAttributes<'button'>;
export const DropdownButton = ReachMenuButton as ComponentWithAs<'button', DropdownButtonProps>;

export default DropdownButton;
