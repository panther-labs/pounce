import React from 'react';
import { ComponentWithAs, forwardRefWithAs, useForkedRef, wrapEvent } from '@reach/utils';
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

  return (
    <Comp
      ref={ref}
      onMouseDown={wrapEvent(onMouseDown, toggle)}
      onKeyDown={wrapEvent(onKeyDown, ({ key }) => key === 'Enter' && toggle())}
      aria-describedby={popoverId}
      {...rest}
    />
  );
});

export default React.memo(PopoverTrigger) as ComponentWithAs<'button', PopoverTriggerProps>;
