import React from 'react';
import Alert, { AlertProps } from 'components/Alert';

export interface SnackbarProps extends AlertProps {
  /** The number of milliseconds that this snackbar will show until it automatically dissapears */
  destroy: () => void;
}

/**
 * A Snackbar is a special version of Alert that gets shown as a response to a user's action in
 * order to provide feedback about the outcome of his action
 */
const Snackbar: React.FC<SnackbarProps> = ({ destroy, ...rest }) => {
  const timeoutRef = React.useRef(0);

  React.useEffect(() => {
    timeoutRef.current = setTimeout(destroy, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return <Alert {...rest} />;
};

export default Snackbar;
