import React from 'react';
import useDropdownAlignment from './useDropdownAlignment';
import {
  MenuItems as ReachMenuItems,
  MenuPopover as ReachMenuPopover,
  useMenuButtonContext as useDropdownContext,
} from '@reach/menu-button';
import { useTransition, animated } from 'react-spring';
import Box from '../Box';

const AnimatedReachMenuPopover = animated(ReachMenuPopover);

export interface DropdownMenuProps {
  /** The position of the menu */
  alignment?: 'left' | 'right' | 'match-width';
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  function DropdownMenu({ alignment = 'right', children }, ref) {
    const position = useDropdownAlignment({ alignment });
    const { isExpanded } = useDropdownContext();

    const transitions = useTransition(isExpanded, null, {
      from: { transform: 'translate3d(0, -10px, 0)', opacity: 0 },
      enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
      leave: { transform: 'translate3d(0, -10px, 0)', opacity: 0 },
      config: { duration: 250 },
    });

    return (
      <React.Fragment>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <AnimatedReachMenuPopover
                key={key}
                style={props}
                position={position}
                ref={ref}
                hidden={false}
              >
                <Box
                  as={ReachMenuItems}
                  bg="navyblue-450"
                  borderRadius="medium"
                  zIndex={99}
                  mt={2}
                  outline="none"
                  overflow="hidden"
                >
                  {children}
                </Box>
              </AnimatedReachMenuPopover>
            )
        )}
      </React.Fragment>
    );
  }
);

export default DropdownMenu;
