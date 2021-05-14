import React from 'react';
import { useComposedRefs } from '@reach/utils';
import { NativeAttributes } from '../../system';
import { usePopoverContext } from './Popover';

export type PopoverTriggerProps = NativeAttributes<'button'>;

const PopoverTrigger = React.forwardRef<
  HTMLElement,
  PopoverTriggerProps & { as: React.ElementType }
>(function PopoverTrigger({ as: Comp = 'button', ...rest }, forwardedRef) {
  // get the ref that we should store this trigger under
  const { popoverId, triggerRef, toggle } = usePopoverContext();

  // merge internal + passed prop together
  const ref = useComposedRefs(triggerRef, forwardedRef);

  return (
    <Comp
      ref={ref}
      onMouseDown={toggle}
      onKeyDown={({ key }: { key: string }) => key === 'Enter' && toggle()}
      aria-describedby={popoverId}
      {...rest}
    />
  );
});

export default React.memo(PopoverTrigger) as React.ForwardRefRenderFunction<
  'button',
  PopoverTriggerProps & { as: React.ElementType }
>;
