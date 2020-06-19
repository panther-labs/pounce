import React from 'react';
import { useTooltip, TooltipPopup } from '@reach/tooltip';
import { useTransition, animated } from 'react-spring';
import Card from '../Card';
import { positionRight } from './utils';

const AnimatedTooltipPopup = animated(TooltipPopup);

export interface TooltipProps {
  /** The string or HTML that the tooltip will show*/
  content: string | React.ReactElement;

  /** @ignore */
  children: React.ReactElement;
}

/** A tooltip is a helper that shows some helping text when hovering or clicking something */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { content, children },
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
              style={{ ...styles, zIndex: 1, position: 'absolute' }}
              ref={ref}
              position={positionRight}
              label={
                <Card p={4} m={2} fontSize="small">
                  {content}
                </Card>
              }
            />
          )
      )}
    </React.Fragment>
  );
});

export default React.memo(Tooltip);