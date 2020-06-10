import React from 'react';
import ControlledAlert, { ControlledAlertProps } from '../utils/ControlledAlert';
import Collapse from '../Collapse';

export type AlertProps = Omit<ControlledAlertProps, 'open' | 'onClose'>;

/** An Alert component is simply a container for text that should capture the user's attention */
const Alert: React.FC<AlertProps> = props => {
  const [open, setOpen] = React.useState(true);

  const onClose = React.useCallback(() => setOpen(false), [setOpen]);

  return (
    <Collapse open={open}>
      <ControlledAlert {...props} open onClose={onClose} />
    </Collapse>
  );
};

export default React.memo(Alert);
