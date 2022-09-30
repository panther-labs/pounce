import React from 'react';
import ControlledAlert, { ControlledAlertProps } from '../utils/ControlledAlert';
import Collapse from '../Collapse';
import omit from 'lodash/omit';

export type AlertProps = Omit<ControlledAlertProps, 'open' | 'onClose'> & {
  onClose?: () => void;
  disableAnimation?: boolean;
};

const noop = () => {};

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = ({ onClose, disableAnimation = false, ...rest }) => {
  const [open, setOpen] = React.useState(true);
  // Remove the discardable prop when the disableAnimation prop is true
  const props = disableAnimation ? omit(rest, 'discardable') : rest;

  const handleClose = React.useCallback(() => {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  }, [setOpen, onClose]);

  return disableAnimation ? (
    <ControlledAlert {...props} open onClose={noop} />
  ) : (
    <Collapse open={open}>
      <ControlledAlert {...props} open onClose={handleClose} />
    </Collapse>
  );
};

export default React.memo(Alert);
