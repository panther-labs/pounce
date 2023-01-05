import React from 'react';
import { useTooltip, TooltipPopup } from '@reach/tooltip';
import { useTransition, animated } from 'react-spring';
import useAlignment, { Alignment } from '../../utils/useAlignment';
import Box from '../Box';

const AnimatedTooltipPopup = animated(TooltipPopup);

const DefaultWrapper: React.FC = ({ children }) => {
  return (
    <Box borderRadius="medium" bg="navyblue-300" p={4} m={2} fontSize="small" boxShadow="dark250">
      {children}
    </Box>
  );
};

export interface TooltipProps {
  /** The string or HTML that the tooltip will show */
  content: string | React.ReactElement;

  /** The wrapper that contains the contnet */
  wrapper?: React.ElementType;

  /** The alignment of the tooltip relative to the content */
  alignment?: Alignment;

  /** @ignore */
  children: React.ReactElement;
}
/** A tooltip is a helper that shows some helping text when hovering or clicking something */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { content, alignment = 'bottom-center', wrapper = DefaultWrapper, children },
  ref
) {
  const [trigger, { triggerRect }, isVisible] = useTooltip();
  const getPositionProperties = useAlignment(alignment);
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

  const Wrapper = wrapper;

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
              position={getPositionProperties}
              as={'div'}
              label={<Wrapper>{content}</Wrapper>}
            />
          )
      )}
    </React.Fragment>
  );
});

export default React.memo(Tooltip);
