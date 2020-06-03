import React from 'react';
import Box from '../Box';
import IconButton from '../IconButton';
import Flex from '../Flex';
import { DialogContent, DialogOverlay } from '@reach/dialog';

export interface SideSheetProps {
  /** Whether the modal should be visible or not */
  open: boolean;

  /**  Callback fired when the component requests to be closed */
  onClose: () => void;

  /** The id of the HTML node that contains the title of the modal */
  'aria-labelledby'?: string;

  /** The id of the HTML node that contains the text of the modal */
  'aria-describedby'?: string;
}

/**
 * A dialog variation that helps with grabbing the user's attention by blurring the background and
 * presenting an element that requires action from the user
 */
const SideSheet: React.FC<SideSheetProps> = ({ children, open, onClose, ...rest }) => (
  <DialogOverlay isOpen={open} onDismiss={onClose}>
    <Flex justify="center" align="center" height="100%" outline="none">
      <DialogContent style={{ outline: 'none' }} {...rest}>
        <Box
          p={10}
          minWidth="560px"
          bg="navyblue-600"
          height="100%"
          position="absolute"
          top="0"
          right="0"
          shadow="dark200"
          outline="none"
          overflow="auto"
        >
          <Box position="relative" p={2}>
            <Box position="absolute" top={2} right={2}>
              <IconButton
                icon="close"
                aria-label="Dismiss Dialog"
                variant="ghost"
                variantColor="navyblue"
                onClick={onClose}
              />
            </Box>
            {children}
          </Box>
        </Box>
      </DialogContent>
    </Flex>
  </DialogOverlay>
);

export default SideSheet;
