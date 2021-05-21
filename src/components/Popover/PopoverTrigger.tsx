import React from 'react';
import { useComposedRefs, composeEventHandlers } from '@reach/utils';
import type * as Polymorphic from '@reach/utils/polymorphic';
import { NativeAttributes } from '../../system';
import { usePopoverContext } from './Popover';

export type PopoverTriggerProps = NativeAttributes<'button'>;

const PopoverTrigger = React.forwardRef<
  HTMLElement,
  PopoverTriggerProps & { as: React.ElementType }
>(function PopoverTrigger({ as: Comp = 'button', onMouseDown, onKeyDown, ...rest }, forwardedRef) {
  // get the ref that we should store this trigger under
  const { popoverId, triggerRef, toggle } = usePopoverContext();

  // merge internal + passed prop together
  const ref = useComposedRefs(triggerRef, forwardedRef);

  return (
    <Comp
      ref={ref}
      onMouseDown={composeEventHandlers(onMouseDown, toggle)}
      onKeyDown={composeEventHandlers(
        onKeyDown,
        ({ key }: { key: string }) => key === 'Enter' && toggle()
      )}
      aria-describedby={popoverId}
      {...rest}
    />
  );
}) as Polymorphic.ForwardRefComponent<'button', PopoverTriggerProps & { as: React.ElementType }>;

export default React.memo(PopoverTrigger);
