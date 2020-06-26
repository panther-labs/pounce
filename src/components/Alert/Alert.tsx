import React from 'react';
import ControlledAlert, { ControlledAlertProps } from '../utils/ControlledAlert';
import Collapse from '../Collapse';

export type AlertProps = Omit<ControlledAlertProps, 'open' | 'onClose'> & { onClose?: () => void };

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = ({ onClose, ...rest }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = React.useCallback(() => {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  }, [setOpen, onClose]);

  return (
    <Collapse open={open}>
      <ControlledAlert {...rest} open onClose={handleClose} />
    </Collapse>
  );
};

export default React.memo(Alert);
