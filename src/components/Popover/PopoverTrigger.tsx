import React from 'react';
import { ComponentWithAs, forwardRefWithAs, useForkedRef } from '@reach/utils';
import { NativeAttributes } from '../../system';
import { usePopoverContext } from './Popover';

export type PopoverTriggerProps = NativeAttributes<'button'>;

const PopoverTrigger = forwardRefWithAs<PopoverTriggerProps, 'button'>(function PopoverTrigger(
  { as: Comp = 'button', onMouseDown, onKeyDown, ...rest },
  forwardedRef
) {
  // get the ref that we should store this trigger under
  const { popoverId, triggerRef, toggle } = usePopoverContext();

  // merge internal + passed prop together
  const ref = useForkedRef(triggerRef, forwardedRef);

  // Toggle Popover on click (mousedown)
  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      toggle();
      if (onMouseDown) {
        onMouseDown(event);
      }
    },
    [onMouseDown, toggle]
  );

  // Toggle on Enter keypress (keydown)
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        toggle();
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    },
    [onKeyDown, toggle]
  );

  return (
    <Comp
      ref={ref}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      aria-describedby={popoverId}
      {...rest}
    />
  );
});

export default React.memo(PopoverTrigger) as ComponentWithAs<'button', PopoverTriggerProps>;
