import React from 'react';
import ControlledAlert, { ControlledAlertProps } from '../utils/ControlledAlert';
import Collapse from '../Collapse';

export type AlertProps = Omit<ControlledAlertProps, 'open' | 'onClose'> & {
  onClose?: () => void;

  /** Whether the Alert is wrapped in a Collapse animation wrapper */
  disableAnimation?: boolean;
};

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = ({ onClose, disableAnimation = false, ...rest }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = React.useCallback(() => {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  }, [setOpen, onClose]);

  return disableAnimation ? (
    <ControlledAlert {...rest} open={open} onClose={handleClose} />
  ) : (
    <Collapse open={open}>
      <ControlledAlert {...rest} open onClose={handleClose} />
    </Collapse>
  );
};

export default React.memo(Alert);
