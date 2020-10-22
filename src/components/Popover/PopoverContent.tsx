import React, { ReactNode } from 'react';
import ReachUIPopover from '@reach/popover';
import { useForkedRef } from '@reach/utils';
import { animated, useTransition } from 'react-spring';
import Card from '../Card';
import { usePopoverContext } from './Popover';
import usePopoverContentAlignment from './usePopoverContentAlignment';
import useOutsideClick from '../../utils/useOutsideClick';
import useEscapeKey from '../../utils/useEscapeKey';

const defaultOffset = [0, 12] as [number, number];
const AnimatedPopover = animated(ReachUIPopover);

export interface PopoverContentProps {
  /**
   * The position to expand the popover
   *
   * @default left
   */
  alignment?: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'left-center' | 'right-center';

  /**
   * The spacing between the trigger and the popover in px, for the horizontal & vertical axis
   *
   * @default [0, 12]
   */
  offset?: [number, number];

  /**
   * @ignore
   */
  children: ReactNode;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    { alignment = 'bottom-left', offset = defaultOffset, children, ...rest },
    forwardedRef
  ) {
    const popoverAlignment = usePopoverContentAlignment({ alignment, offset });
    const { popoverId, isOpen, triggerRef, popoverRef, close } = usePopoverContext();

    // When the popoover opens, it should immediately get focus
    React.useEffect(() => {
      window.requestAnimationFrame(() => {
        if (isOpen && popoverRef.current) {
          popoverRef.current.focus();
        }
      });
    }, [isOpen, popoverRef.current]);

    // Close popover on clicks outside
    useOutsideClick({
      elements: [popoverRef.current, triggerRef.current],
      callback: () => isOpen && close(),
      disabled: !isOpen,
    });

    // Close on ESC key presses
    const escapeKeyHandlers = useEscapeKey({ callback: close });

    // merge internal + passed prop together
    const ref = useForkedRef(popoverRef, forwardedRef);

    const transitions = useTransition(isOpen, null, {
      from: { transform: 'translate3d(0, 10px, 0)', opacity: 0, pointerEvents: 'none' },
      enter: { transform: 'translate3d(0, 0, 0)', opacity: 1, pointerEvents: 'auto' },
      leave: { transform: 'translate3d(0, 10px, 0)', opacity: 0, pointerEvents: 'none' },
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
                targetRef={triggerRef}
                position={popoverAlignment}
                role="tooltip"
                id={popoverId}
              >
                <Card
                  p={6}
                  ref={ref}
                  tabIndex={0}
                  outline="none"
                  shadow="dark300"
                  {...escapeKeyHandlers}
                  {...rest}
                >
                  {children}
                </Card>
              </AnimatedPopover>
            )
        )}
      </React.Fragment>
    );
  }
);

export default React.memo(PopoverContent);
