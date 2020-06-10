import React from 'react';
import useMeasure from 'react-use-measure';
import { animated, useTransition } from 'react-spring';
import Box, { BoxProps } from '../Box';

const AnimatedBox = animated(Box);

export interface CollapseProps extends Pick<BoxProps, 'as'> {
  /** Whether the children are visible or collapsed */
  open: boolean;

  /**
   * Whether the opacity should be animated along with the height
   * @default true
   * */
  animateOpacity?: boolean;

  /**
   * The duration of the animation in ms
   *
   * @default 300
   * */
  duration?: number;

  /** @ignore */
  children: React.ReactElement;
}

/**
 * A Collapse component is simply a wrapper that will slowly reveal its children by gradually
 * animating the total height until all of them are visible
 * */
const Collapse: React.FC<CollapseProps> = ({
  open,
  animateOpacity = true,
  duration = 300,
  children,
  ...rest
}) => {
  const [ref, { height }] = useMeasure();

  const transitions = useTransition(open, null, {
    from: { height: 0, opacity: animateOpacity ? 0 : 1 },
    enter: { height, opacity: 1 },
    leave: { height: 0, opacity: animateOpacity ? 0 : 1 },
    config: { duration },
    update: { height },
  });

  return (
    <React.Fragment>
      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <AnimatedBox key={key} style={styles} {...rest}>
              <Box ref={ref}>{children}</Box>
            </AnimatedBox>
          )
      )}
    </React.Fragment>
  );
};

export default React.memo(Collapse);
