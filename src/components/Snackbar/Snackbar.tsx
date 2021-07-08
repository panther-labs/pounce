import React from 'react';
import ControlledAlert, { ControlledAlertProps } from '../utils/ControlledAlert';

export interface SnackbarProps extends Omit<ControlledAlertProps, 'open' | 'onClose'> {
  /** The number of milliseconds that this snackbar will show until it automatically disappears
   * @default 6000
   * */
  duration?: number;

  /**
   * @ignore
   * A function to call in order for the snackbar to remove itself. Should be provided through
   * the `SnackbarManager` component
   * */
  destroy: () => void;
}

/**
 * A Snackbar is a special version of Alert that gets shown as a response to a user's action in
 * order to provide feedback about the outcome of his action
 */
const Snackbar: React.FC<SnackbarProps> = ({ destroy, duration = 6000, ...rest }) => {
  const timeoutRef = React.useRef<NodeJS.Timeout | number>();

  React.useEffect(() => {
    timeoutRef.current = setTimeout(destroy, duration);
    return () => clearTimeout(timeoutRef.current as number);
  }, [duration]);

  return <ControlledAlert {...rest} open onClose={destroy} variantBackgroundStyle="solid" />;
};

export default Snackbar;
