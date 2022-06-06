import React from 'react';
import { useTooltip, TooltipPopup } from '@reach/tooltip';
import { Position } from '@reach/popover';
import { useTransition, animated } from 'react-spring';
import { positionRight } from './utils';
import Box from '../Box';

const AnimatedTooltipPopup = animated(TooltipPopup);

export interface TooltipProps {
  /** The string or HTML that the tooltip will show*/
  content: string | React.ReactElement;

  /** The position of the tooltip relative to the content */
  position: Position;

  /** @ignore */
  children: React.ReactElement;
}

/** A tooltip is a helper that shows some helping text when hovering or clicking something */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { content, position = positionRight, children },
  ref
) {
  const [trigger, { triggerRect }, isVisible] = useTooltip();
  const transitions = useTransition(isVisible, null, {
    from: { opacity: 0, transform: 'scale(0.95, 0.95)' },
    enter: { opacity: 1, transform: 'scale(1, 1)' },
    leave: { opacity: 0, transform: 'scale(0.95, 0.95)' },
    config: { duration: 150 },
  });

  const childrenWithHandler = React.useMemo(() => React.cloneElement(children, trigger), [
    children,
    trigger,
  ]);

  return (
    <React.Fragment>
      {childrenWithHandler}
      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <AnimatedTooltipPopup
              triggerRect={triggerRect}
              isVisible={item}
              key={key}
              style={{ ...styles, zIndex: 11, position: 'absolute' }}
              ref={ref}
              position={position}
              as={'div'}
              label={
                <Box
                  borderRadius="medium"
                  bg="navyblue-300"
                  p={4}
                  m={2}
                  fontSize="small"
                  boxShadow="dark250"
                >
                  {content}
                </Box>
              }
            />
          )
      )}
    </React.Fragment>
  );
});

export default React.memo(Tooltip);
