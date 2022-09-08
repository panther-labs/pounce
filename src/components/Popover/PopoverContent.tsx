import React, { ReactNode } from 'react';
import ReachUIPopover from '@reach/popover';
import { useComposedRefs } from '@reach/utils';
import { animated, useTransition } from 'react-spring';
import { usePopoverContext } from './Popover';
import usePopoverContentAlignment from './usePopoverContentAlignment';
import useOutsideClick from '../../utils/useOutsideClick';
import useEscapeKey from '../../utils/useEscapeKey';
import Box from '../Box';

const AnimatedPopover = animated(ReachUIPopover);

export interface PopoverContentProps {
  /**
   * The position to expand the popover
   *
   * @default left
   */
  alignment?:
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'left-bottom'
    | 'left-center'
    | 'left-top'
    | 'right-bottom'
    | 'right-center'
    | 'right-top';

  /**
   * Whether the popover should hide when a click outside it occurs
   */
  closeOnOutsideClicks?: boolean;

  /**
   * @ignore
   */
  children: ReactNode;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    { alignment = 'bottom-left', children, closeOnOutsideClicks = true, ...rest },
    forwardedRef
  ) {
    const popoverAlignment = usePopoverContentAlignment(alignment);
    const { popoverId, isOpen, triggerRef, popoverRef, close } = usePopoverContext();

    // When the popoover opens, it should immediately get focus
    React.useEffect(() => {
      window.requestAnimationFrame(() => {
        if (isOpen && popoverRef.current) {
          popoverRef.current.focus();
        }
      });
    }, [isOpen, popoverRef]);

    // Close popover on clicks outside
    useOutsideClick({
      refs: [popoverRef, triggerRef],
      callback: () => isOpen && close(),
      disabled: !closeOnOutsideClicks || !isOpen,
    });

    // Close on ESC key presses
    useEscapeKey({ ref: popoverRef, callback: close, disabled: !isOpen });

    // merge internal + passed prop together
    const ref = useComposedRefs(popoverRef, forwardedRef);

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
                as={'div'}
              >
                <Box ref={ref} tabIndex={0} outline="none" {...rest}>
                  {children}
                </Box>
              </AnimatedPopover>
            )
        )}
      </React.Fragment>
    );
  }
);

export default React.memo(PopoverContent);
