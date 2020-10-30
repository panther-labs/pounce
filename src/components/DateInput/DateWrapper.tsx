import React from 'react';
import Card from '../Card';
import { useTransition, animated } from 'react-spring';
import useDropdownAlignment from '../Dropdown/useDropdownAlignment';
import Popover from '@reach/popover';

interface DateWrapperProps {
  isExpanded: boolean;
  targetRef: React.RefObject<HTMLElement>;
  alignment?: 'left' | 'right' | 'match-width';
}

const AnimatedPopover = animated(Popover);

const DateWrapper = React.forwardRef<HTMLElement, React.PropsWithChildren<DateWrapperProps>>(
  function DateWrapper({ children, isExpanded, targetRef, alignment = 'left' }, ref) {
    const position = useDropdownAlignment({ alignment });
    const transitions = useTransition(isExpanded, null, {
      from: { transform: 'translate3d(0, -10px, 0)', opacity: 0, pointerEvents: 'none' },
      enter: { transform: 'translate3d(0, 0, 0)', opacity: 1, pointerEvents: 'auto' },
      leave: { transform: 'translate3d(0, -10px, 0)', opacity: 0, pointerEvents: 'none' },
      config: { duration: 250 },
    });
    return (
      <>
        {transitions.map(
          ({ item, key, props: styles }) =>
            item && (
              <AnimatedPopover targetRef={targetRef} position={position} key={key} style={styles}>
                <Card
                  ref={ref}
                  position="absolute"
                  boxShadow="dark300"
                  // ugly hack to prevent overlapping popovers due to
                  right={alignment === 'right' && '100%'}
                  mt={4}
                  top={0}
                  zIndex={10}
                >
                  {children}
                </Card>
              </AnimatedPopover>
            )
        )}
      </>
    );
  }
);

export default DateWrapper;
