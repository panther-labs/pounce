import React from 'react';
import ReactTooltipLite from 'react-tooltip-lite';
import Text from './Text';

export interface TooltipProps {
  /** The string or HTML that the tooltip will show*/
  content: string;

  /** The positioning of the Tooltip with regards to the visible element */
  positioning: 'up' | 'left' | 'down' | 'right';

  /** Whether the toolip will stay visible while hovering over it */
  allowHover?: boolean;

  /** How much should it wait before showing the tooltip */
  hoverDelay: number;
}

/**
 * A tooltip is a helper that shows some helping text when hovering or clicking something
 */
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
        <Text
          px={3}
          py={2}
          size="large"
          bg="grey500"
          color="white"
          borderRadius="small"
          fontWeight="normal"
        >
          {content}
        </Text>
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
