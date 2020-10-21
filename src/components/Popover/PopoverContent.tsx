import React, { ReactNode } from 'react';
import ReachUIPopover from '@reach/popover';
import { useForkedRef } from '@reach/utils';
import { animated, useTransition } from 'react-spring';
import Card from '../Card';
import { usePopoverContext } from './Popover';
import usePopoverContentAlignment from './usePopoverContentAlignment';

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
    const { isOpen, triggerRef, popoverRef, close } = usePopoverContext();

    // Close on clicks outside
    React.useEffect(() => {
      const listener = (event: MouseEvent) => {
        // We on want to close only if a click occurred outside the popover and its trigger
        const clickTarget = event.target as Element;
        if (
          isOpen &&
          popoverRef.current &&
          triggerRef.current &&
          !popoverRef.current.contains(clickTarget) &&
          !triggerRef.current.contains(clickTarget)
        ) {
          close();
        }
      };

      window.addEventListener('mousedown', listener, { capture: true });
      return () => {
        window.removeEventListener('mousedown', listener, { capture: true });
      };
    }, [isOpen, close, popoverRef.current]);

    // Close on ESC key presses
    const handleKeyDown = React.useCallback(
      ({ key }: React.KeyboardEvent) => {
        if (key === 'Escape') {
          close();
        }
      },
      [close]
    );

    // When it opens, it should immediately get focus
    React.useEffect(() => {
      window.requestAnimationFrame(() => {
        if (isOpen && popoverRef.current) {
          popoverRef.current.focus();
        }
      });
    }, [isOpen, popoverRef.current]);

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
              >
                <Card
                  p={6}
                  ref={ref}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  outline="none"
                  shadow="dark300"
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
