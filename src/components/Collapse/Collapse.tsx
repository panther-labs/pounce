import React from 'react';
import useMeasure from 'react-use-measure';
import { ResizeObserver } from '@juggle/resize-observer';
import { animated, useTransition } from 'react-spring';
import Box, { BoxProps } from 'components/Box';

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
   * @default Dynamic depending on the height
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
  duration,
  children,
  ...rest
}) => {
  const [ref, { height }] = useMeasure({ polyfill: ResizeObserver });

  const transitions = useTransition(open, null, {
    from: { height: 0, opacity: animateOpacity ? 0 : 1, pointerEvents: 'none', overflow: 'hidden' },
    enter: { height, opacity: 1, pointerEvents: 'auto', overflow: 'unset' },
    leave: {
      height: 0,
      opacity: animateOpacity ? 0 : 1,
      pointerEvents: 'none',
      overflow: 'hidden',
    },
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
