import React from 'react';
import ReachTooltip from '@reach/tooltip';
import Card from '../Card';
import { positionRight } from './utils';

export interface TooltipProps {
  /** The string or HTML that the tooltip will show*/
  content: string | React.ReactElement;
}

/** A tooltip is a helper that shows some helping text when hovering or clicking something */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Toltip(
  { content, children },
  ref
) {
  return (
    <ReachTooltip
      ref={ref}
      position={positionRight}
      style={{ zIndex: 1, position: 'absolute' }}
      label={
        <Card p={4} m={2} fontSize="small">
          {content}
        </Card>
      }
    >
      {children}
    </ReachTooltip>
  );
});

export default React.memo(Tooltip);
