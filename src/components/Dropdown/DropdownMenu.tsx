import React from 'react';
import useDropdownAlignment from './useDropdownAlignment';
import {
  MenuItems as ReachMenuItems,
  MenuPopover as ReachMenuPopover,
  useMenuButtonContext as useDropdownContext,
} from '@reach/menu-button';
import { useTransition, animated } from 'react-spring';
import Box, { BoxProps } from '../Box';

const AnimatedPopover = animated(ReachMenuPopover);

export interface DropdownMenuProps {
  /** The position of the menu */
  alignment?: 'left' | 'right' | 'match-width';

  /** A transform for potentially correcting the alignment */
  transform?: BoxProps['transform'];

  /** An optional minimum width to avoid breaking words to letters */
  minWidth?: BoxProps['minWidth'];
}

export const DropdownMenu = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<DropdownMenuProps>
>(function DropdownMenu({ alignment = 'right', transform, minWidth = '75px', children }, ref) {
  const position = useDropdownAlignment({ alignment });
  const { isExpanded } = useDropdownContext();

  const transitions = useTransition(isExpanded, null, {
    from: { transform: 'translate3d(0, -10px, 0)', opacity: 0, pointerEvents: 'none' },
    enter: { transform: 'translate3d(0, 0, 0)', opacity: 1, pointerEvents: 'auto' },
    leave: { transform: 'translate3d(0, -10px, 0)', opacity: 0, pointerEvents: 'none' },
    config: { duration: 250 },
  });

  return (
    <React.Fragment>
      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <AnimatedPopover
              key={key}
              style={styles}
              position={position}
              ref={ref}
              hidden={false}
              as={'div'}
            >
              <Box
                as={ReachMenuItems}
                bg="navyblue-300"
                borderRadius="medium"
                zIndex={99}
                mt={2}
                outline="none"
                overflow="hidden"
                boxShadow="dark200"
                transform={transform}
                minWidth={minWidth}
              >
                {children}
              </Box>
            </AnimatedPopover>
          )
      )}
    </React.Fragment>
  );
});

export default DropdownMenu;
