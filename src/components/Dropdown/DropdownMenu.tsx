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
}

export const DropdownMenu = React.forwardRef<
  HTMLElement,
  React.PropsWithChildren<DropdownMenuProps>
>(function DropdownMenu({ alignment = 'right', transform, children }, ref) {
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
            // FIXME: TS complains about missing as property, it seems there is an open issue with menu button type here -> https://github.com/reach/reach-ui/issues/724
            // @ts-ignore
            <AnimatedPopover key={key} style={styles} position={position} ref={ref} hidden={false}>
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
