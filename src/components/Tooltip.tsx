import React from 'react';
import ReactTooltipLite from 'react-tooltip-lite';
import Box from 'components/Box';

export interface TooltipProps {
  /** The string or HTML that the tooltip will show*/
  content: string | React.ReactElement;

  /** The positioning of the Tooltip with regards to the visible element */
  positioning?: 'up' | 'left' | 'down' | 'right';

  /** Whether the toolip will stay visible while hovering over it */
  allowHover?: boolean;

  /** How much should it wait before showing the tooltip */
  hoverDelay: number;
}

/** A tooltip is a helper that shows some helping text when hovering or clicking something */
const Tooltip: React.FC<TooltipProps> = ({
  positioning,
  allowHover,
  content,
  children,
  hoverDelay,
}) => {
  return (
    <ReactTooltipLite
      padding="0"
      arrowSize={6}
      distance={10}
      direction={positioning}
      tipContentHover={allowHover}
      hoverDelay={hoverDelay}
      content={
        <Box px={3} py={2} bg="grey500" color="white" borderRadius="small">
          {content}
        </Box>
      }
    >
      {children}
    </ReactTooltipLite>
  );
};

Tooltip.defaultProps = {
  positioning: 'right',
  allowHover: false,
  hoverDelay: 200,
};

export default Tooltip;
