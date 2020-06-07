import React from 'react';
import useMeasure from 'react-use-measure';
import { animated, useTransition } from 'react-spring';
import ControlledAlert, { ControlledAlertProps } from '../utils/ControlledAlert';

export type AlertProps = Omit<ControlledAlertProps, 'open' | 'onClose'>;

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = props => {
  const [open, setOpen] = React.useState(true);
  const [ref, { height }] = useMeasure({ debounce: 0, scroll: false });

  const transitions = useTransition(open, null, {
    from: { height: 0, opacity: 0 },
    enter: { height, opacity: 1 },
    leave: { height: 0, opacity: 0, pointerEvents: 'none' },
    update: { height },
  });

  const onClose = React.useCallback(() => setOpen(false), [setOpen]);

  return (
    <React.Fragment>
      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <animated.div key={key} style={styles}>
              <ControlledAlert {...props} open onClose={onClose} ref={ref} />
            </animated.div>
          )
      )}
    </React.Fragment>
  );
};

export default React.memo(Alert);
