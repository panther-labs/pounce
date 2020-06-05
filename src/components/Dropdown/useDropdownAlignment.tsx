import { DropdownMenuProps } from './DropdownMenu';
import { positionRight, positionMatchWidth, positionDefault, Position } from '@reach/popover';

const useDropdownAlignment = ({ alignment }: DropdownMenuProps): Position => {
  switch (alignment) {
    case 'left':
      return positionDefault;
    case 'match-width':
      return positionMatchWidth;
    case 'right':
    default:
      return positionRight;
  }
};

export default useDropdownAlignment;
