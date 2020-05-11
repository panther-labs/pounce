import React from 'react';
import Alert, { AlertProps } from '../Alert';

export interface SnackbarProps extends AlertProps {
  /** The number of milliseconds that this snackbar will show until it automatically dissapears */
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
const Snackbar: React.FC<SnackbarProps> = ({ destroy, duration, ...rest }) => {
  const timeoutRef = React.useRef(0);

  React.useEffect(() => {
    timeoutRef.current = setTimeout(destroy, duration);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return <Alert size="medium" discardable {...rest} />;
};

Snackbar.defaultProps = {
  duration: 6000,
};

export default Snackbar;
