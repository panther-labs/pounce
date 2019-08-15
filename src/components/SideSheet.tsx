import React from 'react';
import MUIModal from '@material-ui/core/Modal';
import Box, { BoxProps } from 'components/Box';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import { css } from 'styled-components';

export interface SideSheetProps extends BoxProps {
  /** Whether the modal should be visible or not */
  open: boolean;

  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick') => void;

  /** Whether the modal should close by clicking on the backdrop behind it */
  disableBackdropClick?: boolean;

  /** Whether the modal should close by pressing the ESC key */
  disableEscapeKeyDown?: boolean;
}

/**
 * A dialog variation that helps with grabbing the user's attention by blurring the background and
 * presenting an element that requires action from the user
 */
const SideSheet: React.FC<SideSheetProps> = ({
  children,
  open,
  onClose,
  disableBackdropClick,
  disableEscapeKeyDown,
  ...rest
}) => (
  <MUIModal
    role="dialog"
    open={open}
    onClose={onClose}
    disableBackdropClick={disableBackdropClick}
    disableEscapeKeyDown={disableEscapeKeyDown}
  >
    <Box
      p={10}
      minWidth="560px"
      bg="white"
      height="100%"
      position="absolute"
      top="0"
      right="0"
      boxShadow="dark200"
      css={css`
        outline: none;
        overflow: auto;
      `}
      {...rest}
    >
      <Box position="relative" p={2}>
        <IconButton
          variant="default"
          position="absolute"
          top={0}
          right={0}
          onClick={() => onClose({}, 'closeButtonClick')}
        >
          <Icon size="small" type="close" />
        </IconButton>
        {children}
      </Box>
    </Box>
  </MUIModal>
);

SideSheet.defaultProps = {
  onClose: undefined,
  disableBackdropClick: false,
  disableEscapeKeyDown: false,
};

export default SideSheet;
