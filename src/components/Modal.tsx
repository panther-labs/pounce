import React from 'react';
import MUIModal from '@material-ui/core/Modal';
import Box from 'components/Box';
import Card from 'components/Card';
import Heading from 'components/Heading';
import Flex from 'components/Flex';
import { css } from 'styled-components';

export interface ModalProps {
  /** Whether the modal should be visible or not */
  open: boolean;

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  }['bivarianceHack'];

  /** Whether the modal should close by clicking on the backdrop behind it */
  disableBackdropClick?: boolean;

  /** Whether the modal should close by pressing the ESC key */
  disableEscapeKeyDown?: boolean;

  /**
   * The title to add to the modal. When its not an empty string, the modal will have a header
   * component with this text
   * */
  title?: string;
}

/**
 * A dialog variation that helps with grabbing the user's attention by blurring the background and
 * presenting an element that requires action from the user
 */
const Modal: React.FC<ModalProps> = ({
  title,
  children,
  open,
  onClose,
  disableBackdropClick,
  disableEscapeKeyDown,
}) => {
  const handleBackdropClick = (event: React.MouseEvent) => {
    // Ignore the events not coming from the "backdrop"
    // We don't want to close the dialog when clicking the dialog content.
    if (event.target !== event.currentTarget) {
      return;
    }

    if (!disableBackdropClick && onClose) {
      onClose(event, 'backdropClick');
    }
  };

  return (
    <MUIModal
      role="dialog"
      open={open}
      onClose={onClose}
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
      {...(title && {
        'aria-labelledby': title,
        'aria-describedby': title,
      })}
    >
      <Box
        height="100%"
        css={css`
          outline: none;
        `}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          onClick={handleBackdropClick}
        >
          <Card py={5} px={8} minWidth="400px" maxWidth="700px">
            {title && (
              <Box as="header" borderBottom="1px solid" borderColor="grey100" pb={5} mb={5}>
                <Heading size="medium" textAlign="center">
                  {title}
                </Heading>
              </Box>
            )}
            {children}
          </Card>
        </Flex>
      </Box>
    </MUIModal>
  );
};

Modal.defaultProps = {
  disableBackdropClick: false,
  disableEscapeKeyDown: false,
};

export default Modal;
